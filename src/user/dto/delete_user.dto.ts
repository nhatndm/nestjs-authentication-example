import { IsNotEmpty, IsArray } from 'class-validator';

export class DeleteUserDto {
  @IsNotEmpty()
  @IsArray()
  readonly ids?: number[];
}
