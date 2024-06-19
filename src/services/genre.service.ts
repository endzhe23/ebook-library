import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Genre } from '../models/genre.model';
import { CreateGenre } from '../dto/create-genre.dto';
import { UpdateGenre } from '../dto/update-genre.dto';
import { In, Repository } from 'typeorm';
import { Book } from '../models/book.model';

@Injectable()
export class GenreService {
  constructor(
    @Inject('GENRE_REPOSITORY') private genreRepository: Repository<Genre>,
    @Inject('BOOK_REPOSITORY') private bookRepository: Repository<Book>,
  ) {}

  async getGenres(): Promise<Genre[]> {
    return this.genreRepository.find({ relations: ['books'] });
  }

  async createGenre(genreDto: CreateGenre): Promise<void> {
    const books: Book[] = await this.getBooks(genreDto.bookIds);
    const genre: Genre = new Genre(genreDto.name, books);
    await this.genreRepository.save<Genre>(genre);
  }

  async updateGenre(id: number, genreDto: UpdateGenre): Promise<void> {
    const books: Book[] = await this.getBooks(genreDto.bookIds);
    const genre = await this.genreRepository.findOneBy({ id: id });
    if (genre) {
      genre.name = genreDto.name ?? genre.name;
      genre.books = books ?? genre.books;
    }
    await this.genreRepository.save<Genre>(genre);
  }

  async deleteGenre(id: number) {
    await this.genreRepository.delete(id);
  }

  async getGenreById(id: number): Promise<Genre> {
    return await this.genreRepository
      .createQueryBuilder('genre')
      .where({ id })
      .leftJoinAndSelect('genre.books', 'books')
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
