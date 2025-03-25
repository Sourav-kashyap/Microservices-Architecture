import {get, post, patch, put, del, requestBody, param} from '@loopback/rest';
import axios from 'axios';

/* Book Interface */
import {IBook} from '../interface/book-interface';

export class BookApiGatewayController {
  private bookBaseURL = 'http://localhost:3001';
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
}
