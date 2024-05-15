import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AuthorService } from '../services/author.services';
import { Author } from '../models/author.model';
import { CreateAuthor } from '../dto/create-author.dto';
import { UpdateAuthor } from '../dto/update-author.dto';

@Controller('/authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  getAuthors(): Author[] {
    return this.authorService.getAuthors();
  }

  @Post('/add')
  createAuthor(@Body() authorDto: CreateAuthor) {
    return this.authorService.createAuthor(authorDto);
  }

  @Put('/edit/:authorId')
  updateAuthor(
    @Param('authorId') authorId: string,
    @Body() authorDto: UpdateAuthor,
  ) {
    return this.authorService.updateAuthor(authorId, authorDto);
  }

  @Delete('/delete/:authorId')
  deleteAuthor(@Param('authorId') authorId: string) {
    return this.authorService.deleteAuthor(authorId);
  }

  @Get('/author/:authorId')
  getAuthorById(@Param('authorId') authorId: string): Author {
    return this.authorService.getAuthorById(authorId);
  }

  @Get('/author/')
  getAuthorByName(@Query('name') name: string): Author[] {
    return this.authorService.getAuthorByName(name);
  }
}
