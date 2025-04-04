import {get, post, patch, put, del, requestBody, param} from '@loopback/rest';
import axios from 'axios';

/* Category interface */
import {ICategory} from '../interface/category-interface';
import {authenticate, STRATEGY} from 'loopback4-authentication';

export class CategoryApiGatewayController {
  private categoryBaseURL = 'http://localhost:3003';
  constructor() {}

  /* Category End Points */

  @authenticate(STRATEGY.BEARER)
  @post('/categorys')
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
      return `Failed to create category: ${error.message}`;
    }
  }

  @get('/categories')
  async getAllCategories(): Promise<ICategory | string> {
    try {
      const response = await axios.get(`${this.categoryBaseURL}/categories`);
      return response.data;
    } catch (error) {
      return `Failed to get all categories: ${error.message}`;
    }
  }

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
      return `Failed to get category with id ${id}: ${error.message}`;
    }
  }

  @authenticate(STRATEGY.BEARER)
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
      return `Failed to update category with id ${id}: ${error.message}`;
    }
  }

  @authenticate(STRATEGY.BEARER)
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
      return `Failed to delete category with id ${id}: ${error.message}`;
    }
  }
}
