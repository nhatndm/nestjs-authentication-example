import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordForgotDto {
  @IsNotEmpty()
  @IsString()
  readonly token: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
