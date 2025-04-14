import {get, post, patch, del, requestBody, param} from '@loopback/rest';
import axios from 'axios';
/* Author Interface */
import {IAuthor} from '../interface/author-interface';
import {authenticate, STRATEGY} from 'loopback4-authentication';
import {handleError} from '../utils/errorHandle';
import {authorize} from 'loopback4-authorization';
import {PermissionKey} from '../utils/permissionsKeys';

export class AuthorApiGatewayController {
  private authorBaseURL = 'http://localhost:3002';

  constructor() {}

  /* Author End Points */

  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: [PermissionKey.PostAuthor]})
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
      return handleError(error, 'Failed to create author');
    }
  }

  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: [PermissionKey.ViewAuthor]})
  @get('/authors')
  async getAllAuthors(): Promise<IAuthor[] | string> {
    try {
      const response = await axios.get(`${this.authorBaseURL}/authors`);
      return response.data;
    } catch (error) {
      return handleError(error, 'Failed to get all authors');
    }
  }

  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: [PermissionKey.ViewAuthor]})
  @get('/authors/{id}')
  async getAuthorById(
    @param.path.string('id') id: string,
  ): Promise<IAuthor | string> {
    try {
      const response = await axios.get(`${this.authorBaseURL}/authors/${id}`);
      return response.data;
    } catch (error) {
      return handleError(error, `Failed to get author with ID ${id}`);
    }
  }

  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: [PermissionKey.UpdateAuthor]})
  @patch('/authors/{id}')
  async updateAuthor(
    @param.path.string('id') id: string,
    @requestBody() author: IAuthor,
  ): Promise<IAuthor | string> {
    try {
      const response = await axios.patch(
        `${this.authorBaseURL}/authors/${id}`,
        author,
      );
      return response.data;
    } catch (error) {
      return handleError(error, `Failed to update author with ID ${id}`);
    }
  }

  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: [PermissionKey.DeleteAuthor]})
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
      return handleError(error, `Failed to delete author with ID ${id}`);
    }
  }
}
