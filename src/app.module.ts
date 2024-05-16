import { Module } from '@nestjs/common';
import { BookController } from './controllers/book.controller';
import { BookService } from './services/book.service';
import { AuthorController } from './controllers/author.controller';
import { AuthorService } from './services/author.service';
import { DatabaseModule } from './database/database.module';
import { bookRepository } from './repositories/book.repository';
import { authorRepository } from './repositories/author.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [BookController, AuthorController],
  providers: [
    ...bookRepository,
    ...authorRepository,
    BookService,
    AuthorService,
  ],
})
export class AppModule {}
