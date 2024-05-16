import { DataSource } from 'typeorm';
import { Book } from '../models/book.model';

export const bookRepository = [
  {
    provide: 'BOOK_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Book),
    inject: ['DATA_SOURCE'],
  },
];
