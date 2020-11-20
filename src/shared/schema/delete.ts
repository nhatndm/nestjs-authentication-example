import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';

// ENTITY
import { UserEntity } from '../../user/user.entity';

// CONSTANT
import { ERROR_MESSAGE_CODE } from '../../constant';

@Injectable()
export class DeleteSchemaValidationPipes implements CanActivate {
  constructor(private readonly isUserRoute: boolean) {}

  canActivate(context: ExecutionContext): boolean {
    const request: Request & {
      user: UserEntity;
    } = context.switchToHttp().getRequest();
    const { query } = request;
    const queryString: any[] = Array.isArray(query.ids)
      ? query.ids
      : [query.ids];

    if (this.isUserRoute && queryString.includes(`${request.user.id}`)) {
      throw new HttpException(
        {
          code: HttpStatus.BAD_REQUEST,
          metadata: {
            message: ERROR_MESSAGE_CODE.error_010,
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    return true;
  }
}
