import {expect} from '@loopback/testlab';
import sinon from 'sinon';
import {Count} from '@loopback/repository';

import {BookController} from '../../controllers';
import {BookRepository} from '../../repositories';
import {Book} from '../../models';

describe('BookControllerTesting', () => {
  let bookController: BookController;
  let bookRepositoryStub: sinon.SinonStubbedInstance<BookRepository>;

  beforeEach(() => {
    bookRepositoryStub = sinon.createStubInstance(
      BookRepository,
    ) as sinon.SinonStubbedInstance<BookRepository>;
    bookController = new BookController(bookRepositoryStub);
  });

  it('should create a new book', async () => {
    const newBook = new Book({
      bookId: 'b1',
      title: 'Book 1',
      isbn: '1000',
      price: 100,
      publishDate: '10-10-2010',
      authorId: 'a1',
      categoryId: 'c1',
    });

    bookRepositoryStub.create.resolves(newBook);
    const result = await bookController.create(newBook);
    expect(result).to.equal(newBook);
    sinon.assert.calledOnce(bookRepositoryStub.create);
  });

  it('should return the count of books', async () => {
    const count: Count = {count: 5};
    bookRepositoryStub.count.resolves(count);
    const result = await bookController.count();
    expect(result).to.equal(count);
    sinon.assert.calledOnce(bookRepositoryStub.count);
  });

  it('should return an array of books', async () => {
    const books = [
      new Book({
        bookId: 'b1',
        title: 'Book 1',
        isbn: '1000',
        price: 100,
        publishDate: '10-10-2010',
        authorId: 'a1',
        categoryId: 'c1',
      }),
      new Book({
        bookId: 'b2',
        title: 'Book 2',
        isbn: '2000',
        price: 200,
        publishDate: '20-20-2020',
        authorId: 'a2',
        categoryId: 'c2',
      }),
    ];

    bookRepositoryStub.find.resolves(books);
    const result = await bookController.find();
    expect(result).to.equal(books);
    sinon.assert.calledOnce(bookRepositoryStub.find);
  });

  it('should update all books ', async () => {
    const count: Count = {count: 2};
    const bookUpdate = new Book({title: 'Updated Book'});
    bookRepositoryStub.updateAll.resolves(count);
    const result = await bookController.updateAll(bookUpdate);
    expect(result).to.equal(count);
    sinon.assert.calledOnce(bookRepositoryStub.updateAll);
  });

  it('should return a book by id', async () => {
    const books = [
      new Book({
        bookId: 'b1',
        title: 'Book 1',
        isbn: '1000',
        price: 100,
        publishDate: '10-10-2010',
        authorId: 'a1',
        categoryId: 'c1',
      }),
      new Book({
        bookId: 'b2',
        title: 'Book 2',
        isbn: '2000',
        price: 200,
        publishDate: '20-20-2020',
        authorId: 'a2',
        categoryId: 'c2',
      }),
    ];
    const id = 'b2';
    bookRepositoryStub.findById.resolves(books[1]);
    const result = await bookController.findById(id);
    expect(result).to.equal(books[1]);
    sinon.assert.calledOnce(bookRepositoryStub.findById);
  });

  it('should update a book by id', async () => {
    const id = 'b1';
    const bookUpdate = new Book({title: 'Updated Book'});
    bookRepositoryStub.updateById.resolves();
    await bookController.updateById(id, bookUpdate);
    sinon.assert.calledOnce(bookRepositoryStub.updateById);
  });

  it('should replace a book by id', async () => {
    const id = 'b1';
    const book = new Book({title: 'Replaced Book'});
    bookRepositoryStub.replaceById.resolves();
    await bookController.replaceById(id, book);
    sinon.assert.calledOnce(bookRepositoryStub.replaceById);
  });

  it('should delete a book by id', async () => {
    const id = 'b1';
    bookRepositoryStub.deleteById.resolves();
    await bookController.deleteById(id);
    sinon.assert.calledOnce(bookRepositoryStub.deleteById);
  });
});
