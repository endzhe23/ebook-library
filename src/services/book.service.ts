import { Inject, Injectable } from '@nestjs/common';
import { Book } from '../models/book.model';
import { CreateBook } from '../dto/create-book.dto';
import { UpdateBook } from '../dto/update-book.dto';
import { Repository } from 'typeorm';

@Injectable()
export class BookService {
  constructor(
    @Inject('BOOK_REPOSITORY') private bookRepository: Repository<Book>,
  ) {}

  async getBooks(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  async createBook(bookDto: CreateBook): Promise<void> {
    const book: Book = new Book(
      bookDto.author,
      bookDto.title,
      bookDto.description,
      bookDto.ISBN,
    );
    await this.bookRepository.save<Book>(book);
  }

  async updateBook(id: number, bookDto: UpdateBook): Promise<void> {
    const book = await this.bookRepository.findOneBy({ id: id });
    if (book) {
      book.author = bookDto.author ?? book.author;
      book.title = bookDto.title ?? book.title;
      book.description = bookDto.description ?? book.description;
      book.ISBN = bookDto.ISBN ?? book.ISBN;
    }
    await this.bookRepository.save<Book>(book);
  }

  async deleteBook(id: number) {
    await this.bookRepository.delete(id);
  }

  async getBookById(id: number): Promise<Book> {
    return await this.bookRepository.findOneBy({ id: id });
  }

  async getBooksByAuthor(author: string): Promise<Book[]> {
    return this.bookRepository.findBy({ author: author });
  }
}
