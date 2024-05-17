import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Book } from './book.model';

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @ManyToMany(() => Book, (book) => book.authors)
  @JoinTable()
  books: Book[];

  constructor(name: string, books: Book[]) {
    this.name = name;
    this.books = books;
  }
}
