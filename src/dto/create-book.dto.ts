import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBook {
  @IsNotEmpty()
  @IsString()
  author: string;
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsString()
  description: string;
  @IsNotEmpty()
  @IsString()
  ISBN: string;
}
