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
import { AuthorService } from '../services/author.service';
import { CreateAuthor } from '../dto/create-author.dto';
import { Author } from '../models/author.model';
import { UpdateAuthor } from '../dto/update-author.dto';

@Controller('/authors')
export class AuthorController {
  constructor(private readonly appService: AuthorService) {}

  @Get()
  getAuthors() {
    return this.appService.getAuthors();
  }

  @Post('/add')
  createAuthor(@Body() authorDto: CreateAuthor) {
    return this.appService.createAuthor(authorDto);
  }

  @Put('/edit/:authorId')
  updateAuthor(
    @Param('authorId') authorId: string,
    @Body() authorDto: UpdateAuthor,
  ) {
    return this.appService.updateAuthor(authorId, authorDto);
  }

  @Delete('/delete/:authorId')
  deleteAuthor(@Param('authorId') authorId: string) {
    return this.appService.deleteAuthor(authorId);
  }

  @Get('/author/:authorId')
  getAuthorById(@Param('authorId') authorId: string): Author {
    return this.appService.getAuthorById(authorId);
  }

  @Get('/author/')
  getNameByAuthor(@Query('book-title') bookTitle: string): Author[] {
    return this.appService.getNameByAuthor(bookTitle);
  }
}
