import {expect} from '@loopback/testlab';
import sinon from 'sinon';
import axios from 'axios';
import {UserController} from '../../controllers/user.controller';
import {Signup} from '../../interface/user-interface';

describe('UserControllerTesting', () => {
  let controller: UserController;

  const mockUser: Signup = {
    id: 'u1',
    username: 'testuser',
    password: 'testpass',
    email: 'test@example.com',
    role: 'admin',
  };

  beforeEach(() => {
    controller = new UserController();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should return a list of users', async () => {
    const axiosGetStub = sinon.stub(axios, 'get').resolves({data: [mockUser]});
    const result = await controller.getAllUser();
    expect(result).to.deepEqual([mockUser]);
    sinon.assert.calledWithExactly(axiosGetStub, 'http://localhost:3004/users');
  });

  it('should delete a user by ID and return user data', async () => {
    const axiosDelStub = sinon.stub(axios, 'delete').resolves({data: mockUser});
    const result = await controller.deleteUserById('u1');
    expect(result).to.deepEqual(mockUser);
    sinon.assert.calledWithExactly(
      axiosDelStub,
      'http://localhost:3004/user/u1',
    );
  });
});
