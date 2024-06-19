import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Author } from './author.model';
import { Genre } from './genre.model';
import { Type } from 'class-transformer';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Author, (author) => author.books, { onDelete: 'CASCADE' })
  @JoinTable()
  @Type(() => Author)
  authors: Author[];

  @ManyToMany(() => Genre, (genre) => genre.books, { onDelete: 'CASCADE' })
  @JoinTable()
  @Type(() => Genre)
  genres: Genre[];

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({ length: 10 })
  ISBN: string;

  constructor(
    authors: Author[],
    genres: Genre[],
    title: string,
    description: string,
    ISBN: string,
  ) {
    this.authors = authors;
    this.genres = genres;
    this.title = title;
    this.description = description;
    this.ISBN = ISBN;
  }
}
