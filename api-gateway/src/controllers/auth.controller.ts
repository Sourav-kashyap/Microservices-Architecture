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
        throw new HttpErrors.Unauthorized('Token cannot be empty.');
      }

      return token;
    } catch (error) {
      if (error.response) {
        console.error('Error during signup API call:', error.response.data);
        throw new HttpErrors.Unauthorized(
          `Signup failed: ${error.response.data.message || 'Unknown error'}`,
        );
      } else if (error.request) {
        console.error(
          'Error during signup: No response from the server',
          error.request,
        );
        throw new HttpErrors.GatewayTimeout(
          'Signup service is unavailable. Please try again later.',
        );
      } else {
        console.error('Error during signup:', error.message);
        throw new HttpErrors.InternalServerError(
          'An unexpected error occurred during signup.',
        );
      }
    }
  }

  @post('/login')
  async login(@requestBody() credentials: Login): Promise<Token> {
    try {
      const response = await axios.post(
        `${this.authBaseURL}/login`,
        credentials,
      );

      const token: Token = response.data;

      if (!token) {
        throw new HttpErrors.Unauthorized('Token cannot be empty.');
      }

      return token;
    } catch (error) {
      if (error.response) {
        console.error('Error during login API call:', error.response.data);
        throw new HttpErrors.Unauthorized(
          `Login failed: ${error.response.data.message || 'Invalid credentials.'}`,
        );
      } else if (error.request) {
        console.error(
          'Error during login: No response from the server',
          error.request,
        );
        throw new HttpErrors.GatewayTimeout(
          'Login service is unavailable. Please try again later.',
        );
      } else {
        console.error('Error during login:', error.message);
        throw new HttpErrors.InternalServerError(
          'An unexpected error occurred during login.',
        );
      }
    }
  }
}
