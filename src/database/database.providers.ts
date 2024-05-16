import { DataSource } from 'typeorm';
import { Book } from '../models/book.model';
import { Author } from '../models/author.model';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'sqlite',
        database: './database.sqlite',
        entities: [Book, Author],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
