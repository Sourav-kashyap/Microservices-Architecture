import {authenticate, AuthenticationBindings} from 'loopback4-authentication';
import {repository, Getter} from '@loopback/repository';
import {get, HttpErrors} from '@loopback/rest';
import {STRATEGY} from 'loopback4-authentication';
import {User} from '../models/user.model';
import {UserRepository} from '../repositories/user.repository';
import {inject} from '@loopback/core';

export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @inject.getter(AuthenticationBindings.CURRENT_USER)
    private readonly getAuthenticateUser: Getter<User>,
  ) {}

  @authenticate(STRATEGY.BEARER)
  @get('/users')
  async find(): Promise<User[]> {
    return this.userRepository.find();
  }

  @authenticate(STRATEGY.BEARER)
  @get('/me')
  async getCurrentUser(): Promise<User> {
    const user = await this.getAuthenticateUser();
    if (!user) {
      throw new HttpErrors.Unauthorized('No authenticated user found');
    }
    return user;
  }
}
