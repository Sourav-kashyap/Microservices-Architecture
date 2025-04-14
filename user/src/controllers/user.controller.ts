// import {AuthenticationBindings} from 'loopback4-authentication';
import {repository} from '@loopback/repository';
// import {Getter} from '@loopback/repository';
import {get, del, HttpErrors, response, param} from '@loopback/rest';
import {User} from '../models/user.model';
import {UserRepository} from '../repositories/user.repository';
// import {inject} from '@loopback/core';

export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    // @inject.getter(AuthenticationBindings.CURRENT_USER)
    // private readonly getAuthenticateUser: Getter<User>,
  ) {}

  @get('/users')
  async find(): Promise<User[]> {
    try {
      const users = await this.userRepository.find();
      if (!users || users.length === 0) {
        throw new HttpErrors.NotFound('No users found.');
      }
      return users;
    } catch (error) {
      console.error('Error during findUsers:', error.message);
      throw new HttpErrors.InternalServerError('Failed to retrieve users.');
    }
  }

  @del('/user/{id}')
  @response(204, {
    description: 'User DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<User> {
    try {
      const user = await this.userRepository.findOne({where: {id: id}});

      if (!user) {
        throw new HttpErrors.NotFound(`User with id ${id} not found.`);
      }

      await this.userRepository.deleteById(id);
      return user;
    } catch (error) {
      if (error instanceof HttpErrors.NotFound) {
        throw error;
      }

      throw new HttpErrors.InternalServerError(
        `An error occurred: ${error.message}`,
      );
    }
  }
}
