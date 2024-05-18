import { IsArray, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAuthor {
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  name?: string;
  @IsOptional()
  @IsArray({ each: true })
  @ApiProperty({ type: [Number], required: false })
  bookIds: number[];
}
