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
}
