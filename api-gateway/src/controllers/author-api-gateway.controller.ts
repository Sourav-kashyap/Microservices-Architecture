import {get, post, patch, put, del, requestBody, param} from '@loopback/rest';
import axios from 'axios';
/* Author Interface */
import {IAuthor} from '../interface/author-interface';

export class AuthorApiGatewayController {
  private authorBaseURL = 'http://localhost:3002';
  constructor() {}

  /* Author End Points */

  @post('/authors')
  async createAuthor(
    @requestBody() author: IAuthor,
  ): Promise<IAuthor | string> {
    try {
      const response = await axios.post(
        `${this.authorBaseURL}/authors`,
        author,
      );
      return response.data;
    } catch (error) {
      return `Failed to create author: ${error.message}`;
    }
  }

  @get('/authors')
  async getAllAuthors(): Promise<IAuthor | string> {
    try {
      const response = await axios.get(`${this.authorBaseURL}/authors`);
      return response.data;
    } catch (error) {
      return `Failed to get all authors: ${error.message}`;
    }
  }

  @get('/authors/{id}')
  async getAuthorById(
    @param.path.string('id') id: string,
  ): Promise<IAuthor | string> {
    try {
      const response = await axios.get(`${this.authorBaseURL}/authors/${id}`);
      return response.data;
    } catch (error) {
      return `Failed to get author with id ${id}: ${error.message}`;
    }
  }

  @del('/authors/{id}')
  async deleteAuthor(
    @param.path.string('id') id: string,
  ): Promise<IAuthor | string> {
    try {
      const response = await axios.delete(
        `${this.authorBaseURL}/authors/${id}`,
      );
      return response.data;
    } catch (error) {
      return `Failed to delete author with id ${id}: ${error.message}`;
    }
  }
}
