import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateAuthor {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsArray()
  bookIds: number[];
}
