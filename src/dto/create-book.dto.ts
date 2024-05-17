import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateBook {
  @IsNotEmpty()
  @IsArray()
  authorIds: number[];
  @IsNotEmpty()
  @IsString()
  title: string;
  @IsString()
  description: string;
  @IsNotEmpty()
  @IsString()
  ISBN: string;
}
