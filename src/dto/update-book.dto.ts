import { IsArray, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBook {
  @IsOptional()
  @IsArray({ each: true })
  @ApiProperty({ type: [Number], required: false })
  authorIds: number[];
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  title?: string;
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  description?: string;
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  ISBN?: string;
}
