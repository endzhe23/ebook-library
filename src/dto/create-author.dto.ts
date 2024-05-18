import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthor {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;
  @IsNotEmpty()
  @IsArray({ each: true })
  @ApiProperty({ type: [Number] })
  bookIds: number[];
}
