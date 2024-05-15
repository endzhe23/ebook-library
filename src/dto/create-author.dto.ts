import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAuthor {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  book: string;
}
