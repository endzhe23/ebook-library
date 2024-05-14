import { Module } from '@nestjs/common';
import { BookController } from './controllers/book.controller';
import { BookService } from './services/book.service';

@Module({
  imports: [],
  controllers: [BookController],
  providers: [BookService],
})
export class AppModule {}
