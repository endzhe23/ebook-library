import { Inject, Injectable } from '@nestjs/common';
import { Author } from '../models/author.model';
import { CreateAuthor } from '../dto/create-author.dto';
import { UpdateAuthor } from '../dto/update-author.dto';
import { Repository } from 'typeorm';

@Injectable()
export class AuthorService {
  constructor(
    @Inject('AUTHOR_REPOSITORY') private authorRepository: Repository<Author>,
  ) {}

  async getAuthors(): Promise<Author[]> {
    return this.authorRepository.find();
  }

  async createAuthor(authorDto: CreateAuthor): Promise<void> {
    const author: Author = new Author(authorDto.name, authorDto.book);
    await this.authorRepository.save(author);
  }

  async updateAuthor(id: number, authorDto: UpdateAuthor): Promise<void> {
    const author = await this.authorRepository.findOneBy({ id: id });
    if (author) {
      author.name = authorDto.name ?? author.name;
      author.book = authorDto.book ?? author.book;
    }
    await this.authorRepository.save<Author>(author);
  }

  async deleteAuthor(id: number) {
    await this.authorRepository.delete(id);
  }

  async getAuthorById(id: number): Promise<Author> {
    return await this.authorRepository.findOneBy({ id: id }); // .find((author: Author) => author.id === id);
  }

  async getAuthorByName(name: string): Promise<Author[]> {
    return this.authorRepository.findBy({ name: name }); // .find((author: Author) => author.name === name);
  }
}
