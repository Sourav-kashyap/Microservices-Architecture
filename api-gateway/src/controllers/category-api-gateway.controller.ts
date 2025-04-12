import {get, post, patch, del, requestBody, param} from '@loopback/rest';
import axios from 'axios';

/* Category interface */
import {ICategory} from '../interface/category-interface';
import {authenticate, STRATEGY} from 'loopback4-authentication';
import {handleError} from '../utils/errorHandle';
import {authorize} from 'loopback4-authorization';
import {PermissionKey} from '../utils/permissionsKeys';

export class CategoryApiGatewayController {
  private categoryBaseURL = 'http://localhost:3003';

  constructor() {}

  /* Category End Points */

  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: [PermissionKey.PostCategory]})
  @post('/categories')
  async createCategory(
    @requestBody() category: ICategory,
  ): Promise<ICategory | string> {
    try {
      const response = await axios.post(
        `${this.categoryBaseURL}/categories`,
        category,
      );
      return response.data;
    } catch (error) {
      return handleError(error, 'Failed to create category');
    }
  }

  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: [PermissionKey.ViewCategory]})
  @get('/categories')
  async getAllCategories(): Promise<ICategory[] | string> {
    try {
      const response = await axios.get(`${this.categoryBaseURL}/categories`);
      return response.data;
    } catch (error) {
      return handleError(error, 'Failed to get all categories');
    }
  }

  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: [PermissionKey.ViewCategory]})
  @get('/categories/{id}')
  async getCategoryById(
    @param.path.string('id') id: string,
  ): Promise<ICategory | string> {
    try {
      const response = await axios.get(
        `${this.categoryBaseURL}/categories/${id}`,
      );
      return response.data;
    } catch (error) {
      return handleError(error, `Failed to get category with ID ${id}`);
    }
  }

  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: [PermissionKey.UpdateCategory]})
  @patch('/categories/{id}')
  async updateCategory(
    @param.path.string('id') id: string,
    @requestBody() category: ICategory,
  ): Promise<ICategory | string> {
    try {
      const response = await axios.patch(
        `${this.categoryBaseURL}/categories/${id}`,
        category,
      );
      return response.data;
    } catch (error) {
      return handleError(error, `Failed to update category with ID ${id}`);
    }
  }

  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: [PermissionKey.DeleteCategory]})
  @del('/categories/{id}')
  async deleteCategory(
    @param.path.string('id') id: string,
  ): Promise<ICategory | string> {
    try {
      const response = await axios.delete(
        `${this.categoryBaseURL}/categories/${id}`,
      );
      return response.data;
    } catch (error) {
      return handleError(error, `Failed to delete category with ID ${id}`);
    }
  }
}
