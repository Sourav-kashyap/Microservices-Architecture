import dotenv from 'dotenv';
dotenv.config();
import {Provider} from '@loopback/core';
import {HttpErrors} from '@loopback/rest';
import jwt from 'jsonwebtoken';
import {VerifyFunction} from 'loopback4-authentication';
import {Signup} from '../interface/user-interface';

export class BearerTokenVerifyProvider
  implements Provider<VerifyFunction.BearerFn>
{
  constructor() {}

  value(): VerifyFunction.BearerFn {
    console.log('Bearer token verify provider value() called');

    return async (token: string) => {
      try {
        if (!token) {
          throw new HttpErrors.Unauthorized('Unauthorized token');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string, {
          issuer: process.env.JWT_ISSUER,
        });

        const user = decoded as Signup;

        if (!user) {
          throw new HttpErrors.Unauthorized('Invalid Token');
        }

        return user;
      } catch (error) {
        console.error(error);
        throw new HttpErrors.Unauthorized('Invalid or expired token');
      }
    };
  }
}
