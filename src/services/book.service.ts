import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Book } from '../models/book.model';
import { CreateBook } from '../dto/create-book.dto';
import { UpdateBook } from '../dto/update-book.dto';
import { In, Repository } from 'typeorm';
import { Author } from '../models/author.model';
import { Genre } from '../models/genre.model';

@Injectable()
export class BookService {
  constructor(
    @Inject('BOOK_REPOSITORY') private bookRepository: Repository<Book>,
    @Inject('AUTHOR_REPOSITORY') private authorRepository: Repository<Author>,
    @Inject('GENRE_REPOSITORY') private genreRepository: Repository<Genre>,
  ) {}

  async getBooks(): Promise<Book[]> {
    return this.bookRepository.find({ relations: ['authors', 'genres'] });
  }

  async createBook(bookDto: CreateBook): Promise<void> {
    const authors: Author[] = await this.getAuthors(bookDto.authorIds);
    const genres: Genre[] = await this.getGenres(bookDto.genreIds);
    const book: Book = new Book(
      authors,
      genres,
      bookDto.title,
      bookDto.description,
      bookDto.ISBN,
    );
    await this.bookRepository.save<Book>(book);
  }

  async updateBook(id: number, bookDto: UpdateBook): Promise<void> {
    const authors: Author[] = await this.getAuthors(bookDto.authorIds);
    const genres: Genre[] = await this.getGenres(bookDto.genreIds);
    const book = await this.bookRepository.findOneBy({ id: id });
    if (book) {
      book.authors = authors ?? book.authors;
      book.genres = genres ?? book.genres;
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
      .leftJoinAndSelect('book.genres', 'genres')
      .getOne();
  }

  private async getAuthors(authorIds: number[]): Promise<Author[]> {
    if (authorIds) {
      const authors = await this.authorRepository.findBy({
        id: In(authorIds),
      });
      if (authors.length === authorIds.length) {
        return authors;
      } else {
        throw new NotFoundException(['not all authors found']);
      }
    }
  }

  private async getGenres(genreIds: number[]): Promise<Genre[]> {
    if (genreIds) {
      const genres = await this.genreRepository.findBy({
        id: In(genreIds),
      });
      if (genres.length === genreIds.length) {
        return genres;
      } else {
        throw new NotFoundException(['not all genres found']);
      }
    }
  }
}
