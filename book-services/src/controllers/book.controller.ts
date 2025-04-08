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
import {Book} from '../models';
import {BookRepository} from '../repositories';

export class BookController {
  constructor(
    @repository(BookRepository)
    public bookRepository: BookRepository,
  ) {}

  @post('/books')
  @response(200, {
    description: 'Book model instance',
    content: {'application/json': {schema: getModelSchemaRef(Book)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Book, {
            title: 'NewBook',
          }),
        },
      },
    })
    book: Book,
  ): Promise<Book> {
    try {
      return await this.bookRepository.create(book);
    } catch (error) {
      throw new HttpErrors.InternalServerError(
        'Failed to create a book: ' + error.message,
      );
    }
  }

  @get('/books/count')
  @response(200, {
    description: 'Book model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Book) where?: Where<Book>): Promise<Count> {
    try {
      return await this.bookRepository.count(where);
    } catch (error) {
      throw new HttpErrors.InternalServerError(
        'Failed to get book count: ' + error.message,
      );
    }
  }

  @get('/books')
  @response(200, {
    description: 'Array of Book model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Book, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(Book) filter?: Filter<Book>): Promise<Book[]> {
    try {
      const books = await this.bookRepository.find(filter);
      if (books.length === 0) {
        throw new HttpErrors.NotFound('No books found.');
      }
      return books;
    } catch (error) {
      throw new HttpErrors.InternalServerError(
        'Failed to fetch books: ' + error.message,
      );
    }
  }

  @patch('/books')
  @response(200, {
    description: 'Book PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Book, {partial: true}),
        },
      },
    })
    book: Book,
    @param.where(Book) where?: Where<Book>,
  ): Promise<Count> {
    try {
      return await this.bookRepository.updateAll(book, where);
    } catch (error) {
      throw new HttpErrors.InternalServerError(
        'Failed to update books: ' + error.message,
      );
    }
  }

  @get('/books/{id}')
  @response(200, {
    description: 'Book model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Book, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Book, {exclude: 'where'}) filter?: FilterExcludingWhere<Book>,
  ): Promise<Book> {
    try {
      const book = await this.bookRepository.findById(id, filter);
      if (!book) {
        throw new HttpErrors.NotFound(`Book with ID ${id} not found.`);
      }
      return book;
    } catch (error) {
      throw new HttpErrors.InternalServerError(
        'Failed to find the book: ' + error.message,
      );
    }
  }

  @patch('/books/{id}')
  @response(204, {
    description: 'Book PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Book, {partial: true}),
        },
      },
    })
    book: Book,
  ): Promise<void> {
    try {
      await this.bookRepository.updateById(id, book);
    } catch (error) {
      throw new HttpErrors.NotFound(
        `Book with ID ${id} not found or failed to update: ` + error.message,
      );
    }
  }

  @put('/books/{id}')
  @response(204, {
    description: 'Book PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() book: Book,
  ): Promise<void> {
    try {
      await this.bookRepository.replaceById(id, book);
    } catch (error) {
      throw new HttpErrors.NotFound(
        `Book with ID ${id} not found or failed to replace: ` + error.message,
      );
    }
  }

  @del('/books/{id}')
  @response(204, {
    description: 'Book DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    try {
      await this.bookRepository.deleteById(id);
    } catch (error) {
      throw new HttpErrors.NotFound(
        `Book with ID ${id} not found or failed to delete: ` + error.message,
      );
    }
  }
}
