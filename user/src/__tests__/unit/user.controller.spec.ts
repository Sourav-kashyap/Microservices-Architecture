import {expect} from '@loopback/testlab';
import sinon from 'sinon';

import {UserController} from '../../controllers';
import {UserRepository} from '../../repositories';
import {User} from '../../models';

describe('UserController', () => {
  let userController: UserController;
  let userRepositoryStub: sinon.SinonStubbedInstance<UserRepository>;

  beforeEach(() => {
    userRepositoryStub = sinon.createStubInstance(UserRepository);
    userController = new UserController(userRepositoryStub);
  });

  it('should return a list of users', async () => {
    const mockUsers: User[] = [
      new User({
        id: 'u1',
        username: 'user1',
        email: 'user1@example.com',
        password: 'hashedPassword',
        role: 'user',
      }),

      new User({
        id: 'u2',
        username: 'user2',
        email: 'test2@example.com',
        password: 'hashedPassword',
        role: 'admin',
      }),
    ];

    userRepositoryStub.find.resolves(mockUsers);
    const result = await userController.find();
    expect(result).to.eql(mockUsers);
    sinon.assert.calledOnce(userRepositoryStub.find);
  });

  it('should delete a user by ID and return the deleted user', async () => {
    const mockUser: User[] = [
      new User({
        id: 'u1',
        username: 'user1',
        email: 'user1@example.com',
        password: 'hashedPassword',
        role: 'user',
      }),

      new User({
        id: 'u2',
        username: 'user2',
        email: 'test2@example.com',
        password: 'hashedPassword',
        role: 'admin',
      }),
    ];
    const id = 'u1';

    userRepositoryStub.findOne.resolves(mockUser[0]);
    userRepositoryStub.deleteById.resolves();
    const result = await userController.deleteById(id);
    expect(result).to.eql(mockUser[0]);
    sinon.assert.calledOnce(userRepositoryStub.findOne);
    sinon.assert.calledOnce(userRepositoryStub.deleteById);
  });
});
