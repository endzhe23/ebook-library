import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateBook {
  @IsOptional()
  @IsArray()
  authorIds: number[];
  @IsOptional()
  @IsString()
  title?: string;
  @IsOptional()
  @IsString()
  description?: string;
  @IsOptional()
  @IsString()
  ISBN?: string;
}
