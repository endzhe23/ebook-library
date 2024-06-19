import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from './book.model';
import { Type } from 'class-transformer';

@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @ManyToMany(() => Book, (book) => book.genres, { onDelete: 'CASCADE' })
  @Type(() => Book)
  books: Book[];

  constructor(name: string, books: Book[]) {
    this.name = name;
    this.books = books;
  }
}
