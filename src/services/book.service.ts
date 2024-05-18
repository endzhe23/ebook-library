import { Inject, Injectable } from '@nestjs/common';
import { Book } from '../models/book.model';
import { CreateBook } from '../dto/create-book.dto';
import { UpdateBook } from '../dto/update-book.dto';
import { In, Repository } from 'typeorm';
import { Author } from '../models/author.model';

@Injectable()
export class BookService {
  constructor(
    @Inject('BOOK_REPOSITORY') private bookRepository: Repository<Book>,
    @Inject('AUTHOR_REPOSITORY') private authorRepository: Repository<Author>,
  ) {}

  async getBooks(): Promise<Book[]> {
    return this.bookRepository.find({ relations: ['authors'] });
  }

  async createBook(bookDto: CreateBook): Promise<void> {
    const authors: Author[] = await this.getAuthors(bookDto.authorIds);
    const book: Book = new Book(
      authors,
      bookDto.title,
      bookDto.description,
      bookDto.ISBN,
    );
    await this.bookRepository.save<Book>(book);
  }

  async updateBook(id: number, bookDto: UpdateBook): Promise<void> {
    const authors: Author[] = await this.getAuthors(bookDto.authorIds);
    const book = await this.bookRepository.findOneBy({ id: id });
    if (book) {
      book.authors = authors ?? book.authors;
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
    return await this.bookRepository
      .createQueryBuilder('book')
      .where({ id })
      .leftJoinAndSelect('book.authors', 'authors')
      .getOne();
  }

  private async getAuthors(authorIds: number[]): Promise<Author[]> {
    return await this.authorRepository.findBy({
      id: In(authorIds),
    });
  }
}
