import {post, requestBody, HttpErrors} from '@loopback/rest';
import axios from 'axios';

/* Book Interface */
import {Signup} from '../interface/user-interface';
import {Login} from '../interface/user-interface';
import {Token} from '../interface/user-interface';

export class AuthController {
  private authBaseURL = 'http://localhost:3004';

  constructor() {}

  /* Auth End Points */

  @post('/signup')
  async signup(@requestBody() userData: Signup): Promise<Token> {
    try {
      const response = await axios.post(`${this.authBaseURL}/signup`, userData);
      const token: Token = response.data;

      if (!token) {
        throw new HttpErrors.Unauthorized('token cannot be empty');
      }

      return token;
    } catch (error) {
      console.error('Error during signup:', error.message);
      throw new HttpErrors.InternalServerError('Failed to sign up');
    }
  }

  @post('/login')
  async login(@requestBody() credentials: Login): Promise<Token> {
    try {
      const response = await axios.post(
        `${this.authBaseURL}/login`,
        credentials,
      );

      const token = response.data;

      if (!token) {
        throw new HttpErrors.Unauthorized('token cannot be empty');
      }

      return token;
    } catch (error) {
      console.error('Error during login:', error.message);
      throw new HttpErrors.InternalServerError('Failed to log in');
    }
  }
}
