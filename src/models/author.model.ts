import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column()
  book: string;

  constructor(name: string, book: string) {
    this.name = name;
    this.book = book;
  }
}
