import {get, post, patch, put, del, requestBody, param} from '@loopback/rest';
import axios from 'axios';

/* Book Interface */
import {IBook} from '../interface/book-interface';

export class BookApiGatewayController {
  private bookBaseURL = 'http://localhost:3001';
  private authorBaseURL = 'http://localhost:3002';
  private categoryBaseURL = 'http://localhost:3003';

  constructor() {}

  /* Book End Points */

  @post('/books')
  async createBook(@requestBody() book: IBook): Promise<IBook> {
    try {
      const response = await axios.post(`${this.bookBaseURL}/books`, book);
      return response.data;
    } catch (error) {
      console.error('Error creating book:', error);
      throw new Error('Failed to create book');
    }
  }

  @get('/books')
  async getAllBooks(): Promise<IBook[]> {
    try {
      const response = await axios.get(`${this.bookBaseURL}/books`);
      const books = response.data;

      const booksWithDetails: IBook[] = await Promise.all(
        books.map(async (book: IBook) => {
          try {
            const bookAuthorName = await axios.get(
              `${this.authorBaseURL}/authors/${book.authorId}`,
            );
            const bookCategoryName = await axios.get(
              `${this.categoryBaseURL}/categories/${book.categoryId}`,
            );

            return {
              bookID: book.bookID,
              title: book.title,
              isbn: book.isbn,
              price: book.price,
              publishDate: book.publishDate,
              authorId: bookAuthorName.data.name,
              categoryId: bookCategoryName.data.name,
            };
          } catch (error) {
            console.error(
              `Error fetching details for book ${book.bookID}:`,
              error,
            );
            return {
              bookID: book.bookID,
              title: book.title,
              isbn: book.isbn,
              price: book.price,
              publishDate: book.publishDate,
              authorId: 'Author details not available',
              categoryId: 'Category details not available',
              error: 'Failed to fetch author or category details',
            };
          }
        }),
      );

      return booksWithDetails;
    } catch (error) {
      console.error('Error fetching books:', error);
      throw new Error('Failed to fetch books');
    }
  }

  @get('/books/{id}')
  async getBookById(
    @param.path.string('id') id: string,
  ): Promise<IBook | string> {
    try {
      const response = await axios.get(`${this.bookBaseURL}/books/${id}`);
      const book = response.data;

      if (!book) {
        return `Book with ID ${id} not found`;
      }

      const bookAuthorName = await axios.get(
        `${this.authorBaseURL}/authors/${book.authorId}`,
      );
      const bookCategoryName = await axios.get(
        `${this.categoryBaseURL}/categories/${book.categoryId}`,
      );

      return {
        bookID: book.bookID,
        title: book.title,
        isbn: book.isbn,
        price: book.price,
        publishDate: book.publishDate,
        authorId: bookAuthorName.data.name,
        categoryId: bookCategoryName.data.name,
      };
    } catch (error) {
      console.error(`Error fetching book with ID ${id}:`, error);
      throw new Error(`Failed to fetch book with ID ${id}`);
    }
  }
}
