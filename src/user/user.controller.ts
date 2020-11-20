import {
  Controller,
  Get,
  UseGuards,
  Req,
  HttpException,
  HttpStatus,
  Body,
  UsePipes,
  Post,
  Put,
} from '@nestjs/common';
import { Request } from 'express';
import * as crypto from 'crypto';

// SHARED
import { HTTP } from '../shared/interface';

// SERVICE
import { UserService } from './user.service';

// SHARED
import { generateToken, verifyToken } from '../shared/auth/token';
import { SchemaValidationPipes } from '../shared/schema/database';
import { AuthTokenGuard } from '../shared/auth/guard';
import { Roles } from '../shared/auth/role';

// CONSTANT
import {
  API_ROUTE,
  ERROR_MESSAGE_CODE,
  SUCCESS_MESSAGE_CODE,
} from '../constant';

// ENTITY
import { UserEntity } from './user.entity';
import { UserRole } from './user.enum';

// DTO
import {
  SignUpDto,
  LoginDto,
  ForgotPasswordDto,
  UpdatePasswordForgotDto,
  ChangePasswordDto,
  UpdateUserDto,
} from './dto';

@Controller(API_ROUTE.USER)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/sign_up')
  @UsePipes(new SchemaValidationPipes())
  async signUp(
    @Body() signUpDto: SignUpDto,
  ): Promise<HTTP<string> | HttpException> {
    const checkAvailableEmail = await this.userService.findOne({
      email: signUpDto.email,
    });

    if (checkAvailableEmail) {
      throw new HttpException(
        {
          code: HttpStatus.BAD_REQUEST,
          metadata: {
            message: ERROR_MESSAGE_CODE.error_002,
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = new UserEntity();
    user.first_name = signUpDto.first_name;
    user.last_name = signUpDto.last_name;
    user.email = signUpDto.email;
    user.phone = signUpDto.phone;
    user.password = crypto
      .createHmac('sha256', signUpDto.password)
      .digest('hex');

    await this.userService.createUser(user);

    // TODO IMPLEMENT MAIL SERVICE

    return {
      code: 200,
      metadata: {
        message: SUCCESS_MESSAGE_CODE.success_003,
      },
    };
  }

  @Post('/login')
  @UsePipes(new SchemaValidationPipes())
  async logIn(
    @Body() loginDto: LoginDto,
  ): Promise<HTTP<string> | HttpException> {
    const hashedPassword = crypto
      .createHmac('sha256', loginDto.password)
      .digest('hex');

    const userFound = await this.userService.findOne({
      email: loginDto.email,
    });

    if (!userFound) {
      throw new HttpException(
        {
          code: HttpStatus.BAD_REQUEST,
          metadata: {
            message: ERROR_MESSAGE_CODE.error_003,
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.userService.updateUser({
      ...userFound,
      password: hashedPassword,
    });

    const token = generateToken({
      user_role: userFound.role,
      user_id: userFound.id,
    });

    return {
      code: 200,
      metadata: {
        data: token,
      },
    };
  }

  @Post('/forgot_password')
  @UsePipes(new SchemaValidationPipes())
  async forgotPassword(
    @Body() forgotPasswordDto: ForgotPasswordDto,
  ): Promise<HTTP<string> | HttpException> {
    const userFound = await this.userService.findOne({
      email: forgotPasswordDto.email,
    });

    if (!userFound) {
      throw new HttpException(
        {
          code: HttpStatus.BAD_REQUEST,
          metadata: {
            message: ERROR_MESSAGE_CODE.error_003,
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const token = generateToken({
      user_role: userFound.role,
      user_id: userFound.id,
    });

    // TODO WILL SEND EMAIL WITH TOKEN

    return {
      code: 200,
      metadata: {
        message: SUCCESS_MESSAGE_CODE.success_004,
      },
    };
  }

  @Put('/update_password_forgot')
  @UsePipes(new SchemaValidationPipes())
  async updatePasswordForgot(
    @Body() updatePasswordForgotDto: UpdatePasswordForgotDto,
  ): Promise<HTTP<string> | HttpException> {
    const token = await verifyToken(updatePasswordForgotDto.token);

    if (!token) {
      throw new HttpException(
        {
          code: HttpStatus.BAD_REQUEST,
          metadata: {
            message: ERROR_MESSAGE_CODE.error_006,
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const user_id = token.user_id;

    const user = await this.userService.findOne({ id: user_id });

    if (!user) {
      throw new HttpException(
        {
          code: HttpStatus.BAD_REQUEST,
          metadata: {
            message: ERROR_MESSAGE_CODE.error_003,
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const newHashedPassword = crypto
      .createHmac('sha256', updatePasswordForgotDto.password)
      .digest('hex');

    user.password = newHashedPassword;

    await this.userService.updateUser(user);

    return {
      code: 200,
      metadata: {
        message: SUCCESS_MESSAGE_CODE.success_005,
      },
    };
  }

  
  @Get('/me')
  @UseGuards(AuthTokenGuard)
  @Roles(UserRole.User, UserRole.Seller, UserRole.Admin)
  async getUserInformation(
    @Req() request: Request & { currentUser: UserEntity },
  ): Promise<HTTP<UserEntity>> {
    return {
      code: 200,
      metadata: {
        data: request.currentUser,
      },
    };
  }

  @Post('/me/change_password')
  @UseGuards(AuthTokenGuard)
  @Roles(UserRole.User, UserRole.Seller, UserRole.Admin)
  @UsePipes(new SchemaValidationPipes())
  async changePassword(
    @Req() request: Request & { currentUser: UserEntity },
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<HTTP<string> | HttpException> {
    const { currentUser } = request;

    const oldHashedPassword = crypto
      .createHmac('sha256', changePasswordDto.old_password)
      .digest('hex');

    if (currentUser.password !== oldHashedPassword) {
      throw new HttpException(
        {
          code: HttpStatus.BAD_REQUEST,
          metadata: {
            message: ERROR_MESSAGE_CODE.error_004,
          },
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const newHashedPassoword = crypto
      .createHmac('sha256', changePasswordDto.new_password)
      .digest('hex');

    currentUser.password = newHashedPassoword;

    await this.userService.updateUser(currentUser);

    return {
      code: 200,
      metadata: {
        message: SUCCESS_MESSAGE_CODE.success_005,
      },
    };
  }

  @Put('/me')
  @UseGuards(AuthTokenGuard)
  @Roles(UserRole.User, UserRole.Seller, UserRole.Admin)
  @UsePipes(new SchemaValidationPipes())
  async updateUserInformation(
    @Req() request: Request & { currentUser: UserEntity },
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<HTTP<string> | HttpException> {
    const { currentUser } = request;

    if (updateUserDto.first_name) {
      currentUser.first_name = updateUserDto.first_name;
    }

    if (updateUserDto.last_name) {
      currentUser.last_name = updateUserDto.last_name;
    }

    if (updateUserDto.address_street) {
      currentUser.address_street = updateUserDto.address_street;
    }

    if (updateUserDto.address_ward) {
      currentUser.address_ward = updateUserDto.address_ward;
    }

    if (updateUserDto.address_district) {
      currentUser.address_district = updateUserDto.address_district;
    }

    if (updateUserDto.address_province) {
      currentUser.address_province = updateUserDto.address_province;
    }

    await this.userService.updateUser(currentUser);

    return {
      code: 200,
      metadata: {
        message: SUCCESS_MESSAGE_CODE.success_001,
      },
    };
  }
}
