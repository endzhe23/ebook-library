import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBook {
  @IsNotEmpty()
  @IsArray({ each: true })
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
