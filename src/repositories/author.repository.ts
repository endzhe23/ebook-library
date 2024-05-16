import { DataSource } from 'typeorm';
import { Author } from '../models/author.model';

export const authorRepository = [
  {
    provide: 'AUTHOR_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Author),
    inject: ['DATA_SOURCE'],
  },
];
