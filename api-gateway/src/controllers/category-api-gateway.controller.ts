import {get, post, patch, put, del, requestBody, param} from '@loopback/rest';
import axios from 'axios';

/* Category interface */
import {ICategory} from '../interface/category-interface';

export class CategoryApiGatewayController {
  private categoryBaseURL = 'http://localhost:3003';
  constructor() {}

  /* Category End Points */

  @post('/categorys')
  async createCategory(@requestBody() category: ICategory): Promise<ICategory> {
    try {
      const response = await axios.post(
        `${this.categoryBaseURL}/categories`,
        category,
      );
      return response.data;
    } catch (error) {
      console.error('Error creating category:', error);
      throw new Error('Failed to create category');
    }
  }

  @get('/categories')
  async getAllCategories(): Promise<ICategory> {
    try {
      const response = await axios.get(`${this.categoryBaseURL}/categories`);
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error.message);
      throw new Error('Failed to retrieve categories');
    }
  }

  @get('/categories/{id}')
  async getCategoryById(
    @param.path.string('id') id: string,
  ): Promise<ICategory> {
    try {
      const response = await axios.get(
        `${this.categoryBaseURL}/categories/${id}`,
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching category:', error.message);
      throw new Error('Failed to retrieve category');
    }
  }

  @del('/categories/{id}')
  async deleteCategory(
    @param.path.string('id') id: string,
  ): Promise<ICategory> {
    try {
      const response = await axios.delete(
        `${this.categoryBaseURL}/categories/${id}`,
      );
      return response.data;
    } catch (error) {
      console.error(`Error deleting category with ID ${id}:`, error);
      throw new Error(`Failed to delete category with ID ${id}`);
    }
  }
}
