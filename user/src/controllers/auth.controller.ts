import {repository} from '@loopback/repository';
import {post, requestBody} from '@loopback/rest';
import {UserRepository} from '../repositories/user.repository';
import {User} from '../models/user.model';
import {sign} from 'jsonwebtoken';
import {HttpErrors} from '@loopback/rest';
import {compare, hash} from 'bcrypt';
export class AuthController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) {}

  @post('/login')
  async login(
    @requestBody() credentials: {username: string; password: string},
  ): Promise<{token: string}> {
    const user = await this.userRepository.findOne({
      where: {username: credentials.username},
    });

    if (!user) {
      throw new HttpErrors.Unauthorized('Invalid credentials');
    }

    const isPasswordValid = await compare(
      credentials.password,
      user.password as string,
    );

    if (!isPasswordValid) {
      throw new HttpErrors.Unauthorized('invalid username or passowrd');
    }

    const token = sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '1h',
        issuer: process.env.JWT_ISSUER,
      },
    );
    return {token};
  }

  @post('/signup')
  async signup(@requestBody() userData: User): Promise<{token: string}> {
    const existingUser = await this.userRepository.findOne({
      where: {username: userData.username},
    });
    if (existingUser) {
      throw new HttpErrors.Conflict('Username already exists');
    }
    const hashPassword = await hash(userData.password as string, 10);
    const user = await this.userRepository.create({
      ...userData,
      password: hashPassword,
    });
    const token = sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '1h',
        issuer: process.env.JWT_ISSUER,
      },
    );
    return {token};
  }
}
