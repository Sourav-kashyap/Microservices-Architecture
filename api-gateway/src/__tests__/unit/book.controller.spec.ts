import {expect} from '@loopback/testlab';
import sinon from 'sinon';
import axios from 'axios';
import {BookApiGatewayController} from '../../controllers/book-api-gateway.controller';
import {IBook, IBookView} from '../../interface/book-interface';

describe('BookApiGatewayControllerTesting', () => {
  let controller: BookApiGatewayController;

  beforeEach(() => {
    sinon.restore();
    controller = new BookApiGatewayController();
  });

  // when i create a new book then used this formate of books
  const mockBook: IBook = {
    bookId: 'b1',
    title: 'Book 1',
    isbn: '1000',
    price: 29.99,
    publishDate: '01-01-2010',
    authorId: 'a1',
    categoryId: 'c1',
  };

  // when i get all book or a particular book then i used this formate of book
  const mockBookView: IBookView = {
    bookId: 'b1',
    title: 'Book 1',
    isbn: '1000',
    price: 29.99,
    publishDate: '01-01-2010',
    author: {
      authorId: 'a1',
      authorName: 'Vishal Patel',
    },
    category: {
      categoryId: 'c1',
      categoryName: 'Horror',
    },
  };

  it('should create a book and return it', async () => {
    const stub = sinon.stub(axios, 'post').resolves({data: mockBook});
    const result = await controller.createBook(mockBook);
    expect(result).to.equal(mockBook);
    sinon.assert.calledWithExactly(
      stub,
      'http://localhost:3001/books',
      mockBook,
    );
  });

  it('should return a list of books with author and category details', async () => {
    const axiosGetStub = sinon.stub(axios, 'get');

    axiosGetStub.withArgs('http://localhost:3001/books').resolves({
      data: [mockBook],
    });

    axiosGetStub
      .withArgs('http://localhost:3002/authors/a1')
      .resolves({data: {authorId: 'a1', name: 'Vishal Patel'}});

    axiosGetStub
      .withArgs('http://localhost:3003/categories/c1')
      .resolves({data: {categoryId: 'c1', name: 'Horror'}});

    const result = await controller.getAllBooks();

    expect(result).to.deepEqual([mockBookView]);
  });

  it('should return a single book with author and category details', async () => {
    const axiosGetStub = sinon.stub(axios, 'get');

    axiosGetStub
      .withArgs('http://localhost:3001/books/b1')
      .resolves({data: mockBook});

    axiosGetStub
      .withArgs('http://localhost:3002/authors/a1')
      .resolves({data: {authorId: 'a1', authorName: 'Vishal Patel'}});

    axiosGetStub
      .withArgs('http://localhost:3003/categories/c1')
      .resolves({data: {categoryId: 'c1', categoryName: 'Horror'}});

    const result = await controller.getBookById('b1');

    expect(result).to.deepEqual(mockBookView);
  });

  it('should update the book and return updated book data', async () => {
    const stub = sinon.stub(axios, 'patch').resolves({data: mockBook});
    const result = await controller.updateBookById('b1', mockBook);
    expect(result).to.deepEqual(mockBook);
    sinon.assert.calledWithExactly(
      stub,
      'http://localhost:3001/books/b1',
      mockBook,
    );
  });

  it('should delete a book and return its data', async () => {
    const stub = sinon.stub(axios, 'delete').resolves({data: mockBook});
    const result = await controller.deleteBookById('b1');
    expect(result).to.deepEqual(mockBook);
    sinon.assert.calledWithExactly(stub, 'http://localhost:3001/books/b1');
  });
});
