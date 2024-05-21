import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAuthor {
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  name?: string;
  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  @ApiProperty({ type: [Number], required: false })
  bookIds: number[];
}
