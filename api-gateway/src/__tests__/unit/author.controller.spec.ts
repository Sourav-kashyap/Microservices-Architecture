import {expect} from '@loopback/testlab';
import sinon from 'sinon';
import axios from 'axios';

import {AuthorApiGatewayController} from '../../controllers/author-api-gateway.controller';
import {IAuthor} from '../../interface/author-interface';

describe('AuthorApiGatewayControllerTesting', () => {
  let controller: AuthorApiGatewayController;

  const mockAuthor: IAuthor = {
    authorID: 'a1',
    name: 'Author One',
  };

  const mockAuthorList: IAuthor[] = [mockAuthor];

  beforeEach(() => {
    controller = new AuthorApiGatewayController();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should create a new author and return it', async () => {
    const postStub = sinon.stub(axios, 'post').resolves({data: mockAuthor});
    const result = await controller.createAuthor(mockAuthor);
    expect(result).to.equal(mockAuthor);
    sinon.assert.calledWithExactly(
      postStub,
      'http://localhost:3002/authors',
      mockAuthor,
    );
  });

  it('should return a list of authors', async () => {
    const getStub = sinon.stub(axios, 'get').resolves({data: mockAuthorList});
    const result = await controller.getAllAuthors();
    expect(result).to.equal(mockAuthorList);
    sinon.assert.calledWithExactly(getStub, 'http://localhost:3002/authors');
  });

  it('should return a single author by ID', async () => {
    const getStub = sinon.stub(axios, 'get').resolves({data: mockAuthor});
    const result = await controller.getAuthorById('a1');
    expect(result).to.equal(mockAuthor);
    sinon.assert.calledWithExactly(getStub, 'http://localhost:3002/authors/a1');
  });

  it('should update and return the updated author', async () => {
    const patchStub = sinon.stub(axios, 'patch').resolves({data: mockAuthor});
    const result = await controller.updateAuthor('a1', mockAuthor);
    expect(result).to.equal(mockAuthor);
    sinon.assert.calledWithExactly(
      patchStub,
      'http://localhost:3002/authors/a1',
      mockAuthor,
    );
  });

  it('should delete an author and return the deleted author data', async () => {
    const delStub = sinon.stub(axios, 'delete').resolves({data: mockAuthor});
    const result = await controller.deleteAuthor('a1');
    expect(result).to.deepEqual(mockAuthor);
    sinon.assert.calledWithExactly(delStub, 'http://localhost:3002/authors/a1');
  });
});
