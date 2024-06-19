import { DataSource } from 'typeorm';
import { Genre } from '../models/genre.model';

export const genreRepository = [
  {
    provide: 'GENRE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Genre),
    inject: ['DATA_SOURCE'],
  },
];
