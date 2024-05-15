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
import { BookService } from '../services/book.service';
import { Book } from '../models/book.model';
import { CreateBook } from '../dto/create-book.dto';
import { UpdateBook } from '../dto/update-book.dto';

@Controller('/books')
export class BookController {
  constructor(private readonly appService: BookService) {}

  @Get()
  getBooks(): Book[] {
    return this.appService.getBooks();
  }

  @Post('/add')
  createBook(@Body() bookDto: CreateBook) {
    return this.appService.createBook(bookDto);
  }

  @Put('/edit/:bookId')
  updateBook(@Param('bookId') bookId: string, @Body() bookDto: UpdateBook) {
    return this.appService.updateBook(bookId, bookDto);
  }

  @Delete('/delete/:bookId')
  deleteBook(@Param('bookId') bookId: string) {
    return this.appService.deleteBook(bookId);
  }

  @Get('/book/:bookId')
  getBookById(@Param('bookId') bookId: string): Book {
    return this.appService.getBookById(bookId);
  }

  @Get('/book/')
  getBooksByAuthor(@Query('book-author') bookAuthor: string): Book[] {
    return this.appService.getBooksByAuthor(bookAuthor);
  }
}
