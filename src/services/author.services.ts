import { Injectable } from '@nestjs/common';
import { Author } from '../models/author.model';
import { CreateAuthor } from '../dto/create-author.dto';
import { v4 as uuid } from 'uuid';
import { UpdateAuthor } from '../dto/update-author.dto';

@Injectable()
export class AuthorService {
  private _authors: Author[] = [
    {
      id: 'vvjvjfnnn-hhhf36',
      name: 'Daria',
      book: 'Domik',
    },
    {
      id: 'fdksdfkkgdlv-hdhd648',
      name: 'Igor',
      book: 'C++',
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

  updateAuthor(id: string, authorDto: UpdateAuthor): Author {
    const author = this.getAuthorById(id);
    if (author) {
      author.name = authorDto.name ?? author.name;
      author.book = authorDto.book ?? author.book;
    }
    return author;
  }

  deleteAuthor(id: string) {
    this._authors = this._authors.filter((author: Author) => author.id !== id);
  }

  getAuthorById(id: string): Author {
    return this._authors.find((author: Author) => author.id === id);
  }

  getAuthorByName(name: string): Author[] {
    return this._authors.filter((author: Author) => author.name === name);
  }
}
