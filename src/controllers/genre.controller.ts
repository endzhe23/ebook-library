import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { GenreService } from '../services/genre.service';
import { CreateGenre } from '../dto/create-genre.dto';
import { Genre } from '../models/genre.model';
import { UpdateGenre } from '../dto/update-genre.dto';

@Controller('/genres')
export class GenreController {
  constructor(private readonly appService: GenreService) {}

  @Get()
  async getGenres(): Promise<Genre[]> {
    return this.appService.getGenres();
  }

  @Post('/add')
  async createGenre(@Body() genreDto: CreateGenre): Promise<void> {
    return this.appService.createGenre(genreDto);
  }

  @Put('/edit/:genreId')
  async updateGenre(
    @Param('genreId') genreId: number,
    @Body() genreDto: UpdateGenre,
  ): Promise<void> {
    return this.appService.updateGenre(genreId, genreDto);
  }

  @Delete('/delete/:genreId')
  async deleteGenre(@Param('genreId') genreId: number): Promise<void> {
    return this.appService.deleteGenre(genreId);
  }

  @Get('/genre/:genreId')
  async getGenreById(@Param('genreId') genreId: number): Promise<Genre> {
    return this.appService.getGenreById(genreId);
  }
}
