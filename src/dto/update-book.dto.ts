import {
  ArrayMinSize,
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBook {
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  @ApiProperty({ type: [Number], required: false })
  authorIds: number[];
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  @ApiProperty({ type: [Number], required: false })
  genreIds: number[];
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
