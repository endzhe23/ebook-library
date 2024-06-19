import { DataSource } from 'typeorm';
import { Book } from '../models/book.model';
import { Author } from '../models/author.model';
import { Genre } from '../models/genre.model';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'postgres',
        entities: [Book, Author, Genre],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
