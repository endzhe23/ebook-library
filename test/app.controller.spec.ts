import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from '../src/controllers/./book.controller';
import { BookService } from '../src/services/book.service';

describe('AppController', () => {
  let appController: BookController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BookController],
      providers: [BookService],
    }).compile();

    appController = app.get<BookController>(BookController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getBookById()).toBe('Hello World!');
    });
  });
});
