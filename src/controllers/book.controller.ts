import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BookService } from '../services/book.service';
import { Book } from '../models/book.model';
import { CreateBook } from '../dto/create-book.dto';
import { UpdateBook } from '../dto/update-book.dto';

@Controller('/books')
export class BookController {
  constructor(private readonly appService: BookService) {}

  @Get()
  async getBooks(): Promise<Book[]> {
    return this.appService.getBooks();
  }

  @Post('/add')
  async createBook(@Body() bookDto: CreateBook): Promise<void> {
    return this.appService.createBook(bookDto);
  }

  @Put('/edit/:bookId')
  async updateBook(
    @Param('bookId') bookId: number,
    @Body() bookDto: UpdateBook,
  ): Promise<void> {
    return this.appService.updateBook(bookId, bookDto);
  }

  @Delete('/delete/:bookId')
  async deleteBook(@Param('bookId') bookId: number): Promise<void> {
    return this.appService.deleteBook(bookId);
  }

  @Get('/book/:bookId')
  async getBookById(@Param('bookId') bookId: number): Promise<Book> {
    return this.appService.getBookById(bookId);
  }
}
