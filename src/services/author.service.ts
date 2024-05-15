import { Injectable } from '@nestjs/common';
import { Author } from '../models/author.model';
import { v4 as uuid } from 'uuid';
import { CreateAuthor } from '../dto/create-author.dto';
import { UpdateAuthor } from '../dto/update-author.dto';

@Injectable()
export class AuthorService {
  private _authors: Author[] = [
    {
      id: 'fjjfvn45-ddvfh32',
      name: 'Daria',
      book: 'Domik',
    },
    {
      id: 'fjjfvn6778-ddvfh5567',
      name: 'Igor',
      book: 'C#',
    },
  ];

  getAuthors(): Author[] {
    return this._authors;
  }

  createAuthor(authorDto: CreateAuthor) {
    const author: Author = {
      id: uuid(),
      ...authorDto,
    };
    this._authors.push(author);
  }

  updateAuthor(id: string, authorDto: UpdateAuthor) {
    const author = this.getAuthorById(id);
    if (author) {
      author.name = authorDto.name ?? author.name;
      author.book = authorDto.book ?? author.book;
    }
    return author;
  }

  deleteAuthor(id: string) {
    this._authors = this._authors.filter((author) => author.id !== id);
  }

  getAuthorById(id: string): Author {
    return this._authors.find((author) => author.id == id);
  }

  getNameByAuthor(name: string): Author[] {
    return this._authors.filter((author: Author) => author.name === name);
  }
}
