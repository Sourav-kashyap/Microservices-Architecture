import {get, post, patch, del, requestBody, param} from '@loopback/rest';
import axios from 'axios';

/* Book Interface */
import {IBook} from '../interface/book-interface';
import {IBookView} from '../interface/book-interface';

export class BookApiGatewayController {
  private bookBaseURL = 'http://localhost:3001';
  private authorBaseURL = 'http://localhost:3002';
  private categoryBaseURL = 'http://localhost:3003';

  constructor() {}

  /* Book End Points */

  @post('/books')
  async createBook(@requestBody() book: IBook): Promise<IBookView | string> {
    try {
      const response = await axios.post(`${this.bookBaseURL}/books`, book);
      return response.data;
    } catch (error) {
      return `Failed to create book: ${error.message}`;
    }
  }

  @get('/books')
  async getAllBooks(): Promise<IBookView[] | string> {
    try {
      const response = await axios.get(`${this.bookBaseURL}/books`);
      const books = response.data;

      const booksWithDetails: IBookView[] = await Promise.all(
        books.map(async (book: IBook) => {
          try {
            const bookAuthorName = await axios.get(
              `${this.authorBaseURL}/authors/${book.authorId}`,
            );
            const bookCategoryName = await axios.get(
              `${this.categoryBaseURL}/categories/${book.categoryId}`,
            );

            return {
              bookId: book.bookId,
              title: book.title,
              isbn: book.isbn,
              price: book.price,
              publishDate: book.publishDate,
              author: {
                authorId: book.authorId,
                authorName: bookAuthorName.data.name,
              },
              category: {
                categoryId: book.categoryId,
                categoryName: bookCategoryName.data.name,
              },
            };
          } catch (error) {
            console.error(
              `Error fetching details for book ${book.bookId}:`,
              error,
            );
            return {
              bookId: book.bookId,
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
      return `Failed to fetch books: ${error.message}`;
    }
  }

  @get('/books/{id}')
  async getBookById(
    @param.path.string('id') id: string,
  ): Promise<IBookView | string> {
    try {
      const response = await axios.get(`${this.bookBaseURL}/books/${id}`);
      const book = response.data;

      if (!book) {
        // Return a clear error message if the book is not found
        return `Book with ID ${id} not found`;
      }

      const bookAuthorName = await axios.get(
        `${this.authorBaseURL}/authors/${book.authorId}`,
      );
      const bookCategoryName = await axios.get(
        `${this.categoryBaseURL}/categories/${book.categoryId}`,
      );

      return {
        bookId: book.bookId,
        title: book.title,
        isbn: book.isbn,
        price: book.price,
        publishDate: book.publishDate,
        author: {
          authorId: book.authorId,
          authorName: bookAuthorName.data.name,
        },
        category: {
          categoryId: book.categoryId,
          categoryName: bookCategoryName.data.name,
        },
      };
    } catch (error) {
      return `Failed to fetch book with ID ${id}: ${error.message}`;
    }
  }

  @patch('/books/{id}')
  async updateBookById(
    @param.path.string('id') id: string,
    @requestBody() book: IBookView,
  ) {
    try {
      const response = await axios.patch(
        `${this.bookBaseURL}/books/${id}`,
        book,
      );
      return response.data;
    } catch (error) {
      return `Failed to update book with ID ${id}: ${error.message}`;
    }
  }

  @del('/books/{id}')
  async deleteBookById(
    @param.path.string('id') id: string,
  ): Promise<IBook | string> {
    try {
      const response = await axios.delete(`${this.bookBaseURL}/books/${id}`);
      return response.data;
    } catch (error) {
      return `Failed to delete book with ID ${id}: ${error.message}`;
    }
  }
}
