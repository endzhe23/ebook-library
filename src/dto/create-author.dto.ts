import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthor {
  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  @ApiProperty()
  name: string;
  @IsNotEmpty()
  @IsArray()
  @IsNumber({}, { each: true })
  @ApiProperty({ type: [Number] })
  bookIds: number[];
}
