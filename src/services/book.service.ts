import { Injectable } from '@nestjs/common';
import { Book } from '../models/book.model';
import { v4 as uuid } from 'uuid';
import { CreateBook } from '../dto/create-book.dto';
import { UpdateBook } from '../dto/update-book.dto';

@Injectable()
export class BookService {
  private _books: Book[] = [
    {
      id: '8fb552c6-fa13-4712-bfb0-021681e2a5f0',
      author: 'Leo Tolstoy',
      title: 'War and Peace',
      description: 'Boring book',
      ISBN: '8fb552c6',
    },
    {
      id: '393b155b-6ac3-4e87-927a-db216233e365',
      author: 'Leo Tolstoy',
      title: 'Anna Karenina',
      description: 'Boring book',
      ISBN: '8fb552c6',
    },
    {
      id: '11bb4cd6-b6f4-42fc-adad-86b6ca7dc528',
      author: 'Nikolai Gogol',
      title: 'Dead Souls',
      description: 'Boring book',
      ISBN: '8fb552c6',
    },
  ];

  getBooks(): Book[] {
    return this._books;
  }

  createBook(bookDto: CreateBook) {
    const book: Book = {
      id: uuid(),
      ...bookDto,
    };
    this._books.push(book);
  }

  updateBook(id: string, bookDto: UpdateBook) {
    const book = this.getBookById(id);
    if (book) {
      book.author = bookDto.author ?? book.author;
      book.title = bookDto.title ?? book.title;
      book.description = bookDto.description ?? book.description;
      book.ISBN = bookDto.ISBN ?? book.ISBN;
    }
    return book;
  }

  deleteBook(id: string) {
    this._books = this._books.filter((book) => book.id !== id);
  }

  getBookById(id: string): Book {
    return this._books.find((book) => book.id == id);
  }

  getBooksByAuthor(author: string): Book[] {
    return this._books.filter((book: Book) => book.author === author);
  }
}
