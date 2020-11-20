import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { verifyToken, decodeToken } from './token';

// CONSTANT
import { ERROR_MESSAGE_CODE } from '../../constant';

// USER SERVICE
import { UserService } from '../../user/user.service';
import { UserEntity } from '../../user/user.entity';

@Injectable()
export class AuthTokenGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject('UserService') private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { headers } = request;
    const token = headers['authorization'];
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      throw new HttpException(
        {
          code: HttpStatus.BAD_GATEWAY,
          metadata: {
            message: ERROR_MESSAGE_CODE.error_007,
          },
        },
        HttpStatus.BAD_GATEWAY,
      );
    }

    try {
      await verifyToken(token);
      const decoded = decodeToken(token);
      const roleFromToken = decoded.user_role;

      const userInstance = new UserEntity();
      userInstance.id = decoded.user_id;

      const user = await this.userService.findOne(userInstance);

      if (!user) {
        throw new Error(`${HttpStatus.UNAUTHORIZED}`);
      }

      // ADD INFORMATION INTO req
      request.currentUser = user;

      if (!roles.includes(roleFromToken)) {
        throw new Error('From Try Function');
      }
      return true;
    } catch (error) {
      if (typeof error === 'object' && error.message === 'From Try Function') {
        throw new HttpException(
          {
            code: HttpStatus.FORBIDDEN,
            metadata: {
              message: ERROR_MESSAGE_CODE.error_008,
            },
          },
          HttpStatus.FORBIDDEN,
        );
      }

      throw new HttpException(
        {
          code: HttpStatus.UNAUTHORIZED,
          metadata: {
            message: ERROR_MESSAGE_CODE.error_006,
          },
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
