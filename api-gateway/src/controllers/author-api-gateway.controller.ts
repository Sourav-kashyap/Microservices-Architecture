import {get, post, patch, put, del, requestBody, param} from '@loopback/rest';
import axios from 'axios';
/* Author Interface */
import {IAuthor} from '../interface/author-interface';

export class AuthorApiGatewayController {
  private authorBaseURL = 'http://localhost:3002';
  constructor() {}

  /* Author End Points */

  @post('/authors')
  async createAuthor(@requestBody() author: IAuthor): Promise<IAuthor> {
    try {
      const response = await axios.post(
        `${this.authorBaseURL}/authors`,
        author,
      );
      return response.data;
    } catch (error) {
      console.error('Error creating author:', error);
      throw new Error('Failed to create author');
    }
  }
}
