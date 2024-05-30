import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Author } from './author.model';
import { Type } from 'class-transformer';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Author, (author) => author.books, { onDelete: 'CASCADE' })
  @JoinTable()
  @Type(() => Author)
  authors: Author[];

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({ length: 10 })
  ISBN: string;

  constructor(
    authors: Author[],
    title: string,
    description: string,
    ISBN: string,
  ) {
    this.authors = authors;
    this.title = title;
    this.description = description;
    this.ISBN = ISBN;
  }
}
