import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Author } from '../models/author.model';
import { CreateAuthor } from '../dto/create-author.dto';
import { UpdateAuthor } from '../dto/update-author.dto';
import { In, Repository } from 'typeorm';
import { Book } from '../models/book.model';

@Injectable()
export class AuthorService {
  constructor(
    @Inject('AUTHOR_REPOSITORY') private authorRepository: Repository<Author>,
    @Inject('BOOK_REPOSITORY') private bookRepository: Repository<Book>,
  ) {}

  async getAuthors(): Promise<Author[]> {
    return this.authorRepository.find({ relations: ['books'] });
  }

  async createAuthor(authorDto: CreateAuthor): Promise<void> {
    const books: Book[] = await this.getBooks(authorDto.bookIds);
    const author: Author = new Author(authorDto.name, books);
    await this.authorRepository.save<Author>(author);
  }

  async updateAuthor(id: number, authorDto: UpdateAuthor): Promise<void> {
    const books: Book[] = await this.getBooks(authorDto.bookIds);
    const author = await this.authorRepository.findOneBy({ id: id });
    if (author) {
      author.name = authorDto.name ?? author.name;
      author.books = books ?? author.books;
    }
    await this.authorRepository.save<Author>(author);
  }

  async deleteAuthor(id: number) {
    await this.authorRepository.delete(id);
  }

  async getAuthorById(id: number): Promise<Author> {
    return await this.authorRepository
      .createQueryBuilder('author')
      .where({ id })
      .leftJoinAndSelect('author.books', 'books')
      .getOne();
  }

  private async getBooks(bookIds: number[]): Promise<Book[]> {
    if (bookIds) {
      const books = await this.bookRepository.findBy({
        id: In(bookIds),
      });
      if (books.length === bookIds.length) {
        return books;
      } else {
        throw new NotFoundException(['not all books found']);
      }
    }
  }
}
