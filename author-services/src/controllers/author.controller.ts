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
import {Author} from '../models';
import {AuthorRepository} from '../repositories';

export class AuthorController {
  constructor(
    @repository(AuthorRepository)
    public authorRepository: AuthorRepository,
  ) {}

  @post('/authors')
  @response(200, {
    description: 'Author model instance',
    content: {'application/json': {schema: getModelSchemaRef(Author)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Author, {
            title: 'NewAuthor',
          }),
        },
      },
    })
    author: Author,
  ): Promise<Author> {
    try {
      return await this.authorRepository.create(author);
    } catch (error) {
      throw new HttpErrors.InternalServerError(
        'Failed to create author: ' + error.message,
      );
    }
  }

  @get('/authors/count')
  @response(200, {
    description: 'Author model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Author) where?: Where<Author>): Promise<Count> {
    try {
      return await this.authorRepository.count(where);
    } catch (error) {
      throw new HttpErrors.InternalServerError(
        'Failed to get author count: ' + error.message,
      );
    }
  }

  @get('/authors')
  @response(200, {
    description: 'Array of Author model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Author, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(Author) filter?: Filter<Author>): Promise<Author[]> {
    try {
      const authors = await this.authorRepository.find(filter);
      if (authors.length === 0) {
        throw new HttpErrors.NotFound('No authors found.');
      }
      return authors;
    } catch (error) {
      throw new HttpErrors.InternalServerError(
        'Failed to fetch authors: ' + error.message,
      );
    }
  }

  @patch('/authors')
  @response(200, {
    description: 'Author PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Author, {partial: true}),
        },
      },
    })
    author: Author,
    @param.where(Author) where?: Where<Author>,
  ): Promise<Count> {
    try {
      return await this.authorRepository.updateAll(author, where);
    } catch (error) {
      throw new HttpErrors.InternalServerError(
        'Failed to update authors: ' + error.message,
      );
    }
  }

  @get('/authors/{id}')
  @response(200, {
    description: 'Author model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Author, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Author, {exclude: 'where'})
    filter?: FilterExcludingWhere<Author>,
  ): Promise<Author> {
    try {
      const author = await this.authorRepository.findById(id, filter);
      if (!author) {
        throw new HttpErrors.NotFound(`Author with ID ${id} not found.`);
      }
      return author;
    } catch (error) {
      throw new HttpErrors.InternalServerError(
        'Failed to find the author: ' + error.message,
      );
    }
  }

  @patch('/authors/{id}')
  @response(204, {
    description: 'Author PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Author, {partial: true}),
        },
      },
    })
    author: Author,
  ): Promise<void> {
    try {
      await this.authorRepository.updateById(id, author);
    } catch (error) {
      throw new HttpErrors.NotFound(
        `Author with ID ${id} not found or failed to update: ` + error.message,
      );
    }
  }

  @put('/authors/{id}')
  @response(204, {
    description: 'Author PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() author: Author,
  ): Promise<void> {
    try {
      await this.authorRepository.replaceById(id, author);
    } catch (error) {
      throw new HttpErrors.NotFound(
        `Author with ID ${id} not found or failed to replace: ` + error.message,
      );
    }
  }

  @del('/authors/{id}')
  @response(204, {
    description: 'Author DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    try {
      await this.authorRepository.deleteById(id);
    } catch (error) {
      throw new HttpErrors.NotFound(
        `Author with ID ${id} not found or failed to delete: ` + error.message,
      );
    }
  }
}
