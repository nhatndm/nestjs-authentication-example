import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
