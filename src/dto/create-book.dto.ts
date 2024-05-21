import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBook {
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  @Length(2, 50)
  @IsNumber({}, { each: true })
  @ApiProperty({ type: [Number] })
  authorIds: number[];
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  title: string;
  @IsString()
  @ApiProperty()
  description: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  ISBN: string;
}
