import {expect} from '@loopback/testlab';
import sinon from 'sinon';
import axios from 'axios';

import {AuthController} from '../../controllers/auth.controller';
import {Signup, Login, Token} from '../../interface/user-interface';

describe('AuthControllerTesting', () => {
  let authController: AuthController;

  const dummyToken: Token = {
    token: 'dummy-jwt-token',
  };

  beforeEach(() => {
    authController = new AuthController();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should return a token on successful signup', async () => {
    const axiosPostStub: sinon.SinonStub = sinon.stub(axios, 'post');
    const userData: Signup = {
      username: 'testuser',
      password: 'testpass',
      email: 'test@example.com',
      role: 'admin',
    };

    axiosPostStub.resolves({data: dummyToken});

    const result = await authController.signup(userData);
    expect(result).to.equal(dummyToken);

    sinon.assert.calledWithExactly(
      axiosPostStub,
      'http://localhost:3004/signup',
      userData,
    );
  });

  it('should return a token on successful login', async () => {
    const axiosPostStub: sinon.SinonStub = sinon.stub(axios, 'post');

    const credentials: Login = {
      username: 'testuser',
      password: 'testpass',
    };

    axiosPostStub.resolves({data: dummyToken});

    const result = await authController.login(credentials);
    expect(result).to.equal(dummyToken);
    sinon.assert.calledWithExactly(
      axiosPostStub,
      'http://localhost:3004/login',
      credentials,
    );
  });
});
