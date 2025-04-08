import {get, requestBody, HttpErrors, param, del} from '@loopback/rest';
import axios from 'axios';

/* Book Interface */
import {Signup} from '../interface/user-interface';
import {authenticate, STRATEGY} from 'loopback4-authentication';
import {authorize} from 'loopback4-authorization';
import {PermissionKey} from '../utils/permissionsKeys';

export class UserController {
  private userBaseURL = 'http://localhost:3004';

  constructor() {}

  /* Auth End Points */
  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: [PermissionKey.ViewUser]})
  @get('/users')
  async getAllUser(): Promise<Signup[]> {
    try {
      const response = await axios.get(`${this.userBaseURL}/users`);
      const users: Signup[] = response.data;
      if (!users || users.length === 0) {
        throw new HttpErrors.NotFound('No users found.');
      }
      return users;
    } catch (error) {
      console.error('Error during GetAllUsers:', error.message);
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 404) {
          throw new HttpErrors.NotFound('No users found.');
        }
        throw new HttpErrors.InternalServerError(
          `Failed to get all users: ${error.message}`,
        );
      }
      throw new HttpErrors.InternalServerError('Failed to get all users');
    }
  }

  @authenticate(STRATEGY.BEARER)
  @authorize({permissions: [PermissionKey.DeleteUser]})
  @del('/user/{id}')
  async deleteUserById(
    @param.path.string('id') id: string,
  ): Promise<Signup | string> {
    try {
      const response = await axios.delete(`${this.userBaseURL}/user/${id}`);
      const deleteUser: Signup = response.data;
      if (!deleteUser) {
        throw new HttpErrors.NotFound(`User with ID ${id} not found.`);
      }
      return deleteUser;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 404) {
          throw new HttpErrors.NotFound(`User with ID ${id} not found.`);
        }
        throw new HttpErrors.InternalServerError(
          `Failed to delete user with ID ${id}: ${error.message}`,
        );
      }
      throw new HttpErrors.InternalServerError(
        `Failed to delete user with ID ${id}: ${error.message}`,
      );
    }
  }
}
