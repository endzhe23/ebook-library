import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  author: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({ length: 10 })
  ISBN: string;

  constructor(
    author: string,
    title: string,
    description: string,
    ISBN: string,
  ) {
    this.author = author;
    this.title = title;
    this.description = description;
    this.ISBN = ISBN;
  }
}
