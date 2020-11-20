import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly first_name?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly last_name?: string;

  @IsOptional()
  @IsString()
  readonly address_street?: string;

  @IsOptional()
  @IsString()
  readonly address_ward?: string;

  @IsOptional()
  @IsString()
  readonly address_district?: string;

  @IsOptional()
  @IsString()
  readonly address_province?: string;
}
