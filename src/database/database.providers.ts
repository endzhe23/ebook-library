import { DataSource } from 'typeorm';
import { Book } from '../models/book.model';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'sqlite',
        database: './database.sqlite',
        entities: [Book],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
