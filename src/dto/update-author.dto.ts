import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateAuthor {
  @IsOptional()
  @IsString()
  name?: string;
  @IsOptional()
  @IsArray()
  bookIds: number[];
}
