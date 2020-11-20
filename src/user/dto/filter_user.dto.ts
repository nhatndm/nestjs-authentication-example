import { IsNotEmpty, IsOptional, IsArray } from 'class-validator';
import { UserRole } from '../user.enum';

export class FilterUserDto {
  @IsOptional()
  @IsNotEmpty()
  @IsArray()
  readonly ids?: number[];

  @IsOptional()
  @IsNotEmpty()
  readonly first_name?: string;

  @IsOptional()
  @IsNotEmpty()
  readonly last_name?: string;

  @IsOptional()
  @IsArray()
  readonly email?: string[];

  @IsOptional()
  @IsArray()
  readonly phone?: string[];

  @IsOptional()
  @IsNotEmpty()
  readonly role?: UserRole;
}
