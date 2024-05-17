import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AuthorService } from '../services/author.service';
import { CreateAuthor } from '../dto/create-author.dto';
import { Author } from '../models/author.model';
import { UpdateAuthor } from '../dto/update-author.dto';

@Controller('/authors')
export class AuthorController {
  constructor(private readonly appService: AuthorService) {}

  @Get()
  async getAuthors(): Promise<Author[]> {
    return this.appService.getAuthors();
  }

  @Post('/add')
  async createAuthor(@Body() authorDto: CreateAuthor): Promise<void> {
    return this.appService.createAuthor(authorDto);
  }

  @Put('/edit/:authorId')
  async updateAuthor(
    @Param('authorId') authorId: number,
    @Body() authorDto: UpdateAuthor,
  ): Promise<void> {
    return this.appService.updateAuthor(authorId, authorDto);
  }

  @Delete('/delete/:authorId')
  async deleteAuthor(@Param('authorId') authorId: number): Promise<void> {
    return this.appService.deleteAuthor(authorId);
  }

  @Get('/author/:authorId')
  async getAuthorById(@Param('authorId') authorId: number): Promise<Author> {
    return this.appService.getAuthorById(authorId);
  }
}
