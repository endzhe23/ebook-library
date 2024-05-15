import { IsOptional, IsString } from 'class-validator';

export class UpdateAuthor {
  @IsOptional()
  @IsString()
  name?: string;
  @IsOptional()
  @IsString()
  book?: string;
}
