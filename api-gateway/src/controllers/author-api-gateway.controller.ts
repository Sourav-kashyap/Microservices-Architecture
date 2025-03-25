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

  @get('/authors')
  async getAllAuthors(): Promise<IAuthor> {
    try {
      const response = await axios.get(`${this.authorBaseURL}/authors`);
      return response.data;
    } catch (error) {
      console.error('Error fetching authors:', error.message);
      throw new Error('Failed to retrieve authors');
    }
  }

  @get('/authors/{id}')
  async getAuthorById(@param.path.string('id') id: string): Promise<IAuthor> {
    try {
      const response = await axios.get(`${this.authorBaseURL}/authors/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching author:', error.message);
      throw new Error('Failed to retrieve author');
    }
  }

  @del('/authors/{id}')
  async deleteAuthor(@param.path.string('id') id: string): Promise<IAuthor> {
    try {
      const response = await axios.delete(
        `${this.authorBaseURL}/authors/${id}`,
      );
      return response.data;
    } catch (error) {
      console.error(`Error deleting author with ID ${id}:`, error);
      throw new Error(`Failed to delete author with ID ${id}`);
    }
  }
}
