import { Module } from '@nestjs/common';
import { BookController } from './controllers/book.controller';
import { BookService } from './services/book.service';
import { AuthorController } from './controllers/author.controller';
import { AuthorService } from './services/author.service';
import { DatabaseModule } from './database/database.module';
import { bookRepository } from './repositories/book.repository';

@Module({
  imports: [],
  controllers: [BookController, AuthorController],
  providers: [BookService, AuthorService],
})
export class AppModule {}
