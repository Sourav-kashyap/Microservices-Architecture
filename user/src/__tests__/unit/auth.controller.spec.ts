import {expect} from '@loopback/testlab';
import sinon from 'sinon';
import {sign} from 'jsonwebtoken';
const bcrypt = require('bcrypt');

import {AuthController} from '../../controllers';
import {UserRepository} from '../../repositories';
import {User} from '../../models';

describe('AuthControllerTesting', () => {
  let authController: AuthController;
  let userRepositoryStub: sinon.SinonStubbedInstance<UserRepository>;

  beforeEach(() => {
    userRepositoryStub = sinon.createStubInstance(
      UserRepository,
    ) as sinon.SinonStubbedInstance<UserRepository>;
    authController = new AuthController(userRepositoryStub);
  });

  it('should return a token for successfully login with valid credentials', async () => {
    const user = new User({
      id: 'u1',
      username: 'testuser',
      email: 'test@example.com',
      password: 'hashedPassword',
      role: 'user',
    });

    const credentials = {
      username: 'testuser',
      password: 'testpassword',
    };

    const validPassword = true;

    userRepositoryStub.findOne.resolves(user);
    sinon.stub(bcrypt, 'compare').resolves(validPassword);

    const token = sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '1d',
        issuer: process.env.JWT_ISSUER,
      },
    );

    const result = await authController.login(credentials);
    expect(result.token).to.equal(token);
    sinon.assert.calledOnce(userRepositoryStub.findOne);
  });

  it('should return a token for successful signup', async () => {
    const userData = new User({
      id: 'u1',
      username: 'newuser',
      email: 'new@example.com',
      password: 'plaintextpassword',
      role: 'admin',
    });

    const hashPassword = 'hashedPassword';

    userRepositoryStub.findOne.resolves(null);

    sinon.stub(bcrypt, 'hash').resolves(hashPassword);

    const user = new User({
      ...userData,
      password: hashPassword,
    });

    userRepositoryStub.create.resolves(user);

    const token = sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '1d',
        issuer: process.env.JWT_ISSUER,
      },
    );

    const result = await authController.signup(userData);
    expect(result.token).to.equal(token);
    sinon.assert.calledOnce(userRepositoryStub.findOne);
    sinon.assert.calledOnce(userRepositoryStub.create);
  });
});
