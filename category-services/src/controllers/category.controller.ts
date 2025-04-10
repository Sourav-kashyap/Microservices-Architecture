import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
  HttpErrors,
} from '@loopback/rest';
import {Category} from '../models';
import {CategoryRepository} from '../repositories';

export class CategoryController {
  constructor(
    @repository(CategoryRepository)
    public categoryRepository: CategoryRepository,
  ) {}

  @post('/categories')
  @response(200, {
    description: 'Category model instance',
    content: {'application/json': {schema: getModelSchemaRef(Category)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Category, {
            title: 'NewCategory',
          }),
        },
      },
    })
    category: Category,
  ): Promise<Category> {
    try {
      return await this.categoryRepository.create(category);
    } catch (error) {
      throw new HttpErrors.InternalServerError(
        'Failed to create category: ' + error.message,
      );
    }
  }

  @get('/categories/count')
  @response(200, {
    description: 'Category model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Category) where?: Where<Category>): Promise<Count> {
    try {
      return await this.categoryRepository.count(where);
    } catch (error) {
      throw new HttpErrors.InternalServerError(
        'Failed to get category count: ' + error.message,
      );
    }
  }

  @get('/categories')
  @response(200, {
    description: 'Array of Category model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Category, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Category) filter?: Filter<Category>,
  ): Promise<Category[]> {
    try {
      const categories = await this.categoryRepository.find(filter);
      if (categories.length === 0) {
        throw new HttpErrors.NotFound('No categories found.');
      }
      return categories;
    } catch (error) {
      throw new HttpErrors.InternalServerError(
        'Failed to fetch categories: ' + error.message,
      );
    }
  }

  @patch('/categories')
  @response(200, {
    description: 'Category PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Category, {partial: true}),
        },
      },
    })
    category: Category,
    @param.where(Category) where?: Where<Category>,
  ): Promise<Count> {
    try {
      return await this.categoryRepository.updateAll(category, where);
    } catch (error) {
      throw new HttpErrors.InternalServerError(
        'Failed to update categories: ' + error.message,
      );
    }
  }

  @get('/categories/{id}')
  @response(200, {
    description: 'Category model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Category, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Category, {exclude: 'where'})
    filter?: FilterExcludingWhere<Category>,
  ): Promise<Category> {
    try {
      const category = await this.categoryRepository.findById(id, filter);
      if (!category) {
        throw new HttpErrors.NotFound(`Category with ID ${id} not found.`);
      }
      return category;
    } catch (error) {
      if (error instanceof HttpErrors.NotFound) {
        throw error; // propagate "not found" error
      }
      throw new HttpErrors.InternalServerError(
        'Failed to find the category: ' + error.message,
      );
    }
  }

  @patch('/categories/{id}')
  @response(204, {
    description: 'Category PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Category, {partial: true}),
        },
      },
    })
    category: Partial<Category>,
  ): Promise<void> {
    try {
      await this.categoryRepository.updateById(id, category);
    } catch (error) {
      if (error.name === 'EntityNotFoundError') {
        throw new HttpErrors.NotFound(`Category with ID ${id} not found.`);
      }
      throw new HttpErrors.InternalServerError(
        'Failed to update category: ' + error.message,
      );
    }
  }

  @put('/categories/{id}')
  @response(204, {
    description: 'Category PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() category: Category,
  ): Promise<void> {
    try {
      await this.categoryRepository.replaceById(id, category);
    } catch (error) {
      if (error.name === 'EntityNotFoundError') {
        throw new HttpErrors.NotFound(`Category with ID ${id} not found.`);
      }
      throw new HttpErrors.InternalServerError(
        'Failed to replace category: ' + error.message,
      );
    }
  }

  @del('/categories/{id}')
  @response(204, {
    description: 'Category DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    try {
      await this.categoryRepository.deleteById(id);
    } catch (error) {
      if (error.name === 'EntityNotFoundError') {
        throw new HttpErrors.NotFound(`Category with ID ${id} not found.`);
      }
      throw new HttpErrors.InternalServerError(
        'Failed to delete category: ' + error.message,
      );
    }
  }
}
