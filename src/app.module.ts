import { Module } from '@nestjs/common';
import { BookController } from './controllers/book.controller';
import { BookService } from './services/book.service';
import { AuthorController } from './controllers/author.controller';
import { AuthorService } from './services/author.service';
import { DatabaseModule } from './database/database.module';
import { bookRepository } from './repositories/book.repository';
import { authorRepository } from './repositories/author.repository';
import { genreRepository } from './repositories/genre.repository';
import { GenreService } from './services/genre.service';
import { GenreController } from './controllers/genre.controller';

@Module({
  imports: [DatabaseModule],
  controllers: [BookController, AuthorController, GenreController],
  providers: [
    ...bookRepository,
    ...authorRepository,
    ...genreRepository,
    BookService,
    AuthorService,
    GenreService,
  ],
})
export class AppModule {}
