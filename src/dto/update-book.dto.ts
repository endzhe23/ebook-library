import { IsOptional, IsString } from 'class-validator';

export class UpdateBook {
  @IsOptional()
  @IsString()
  author?: string;
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
