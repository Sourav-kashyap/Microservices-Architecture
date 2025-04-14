import {expect} from '@loopback/testlab';
import sinon from 'sinon';
import axios from 'axios';
import {CategoryApiGatewayController} from '../../controllers/category-api-gateway.controller';
import {ICategory} from '../../interface/category-interface';

describe('CategoryApiGatewayControllerTesting', () => {
  let controller: CategoryApiGatewayController;

  const mockCategory: ICategory = {
    categoryID: 'c1',
    name: 'Horror',
  };

  beforeEach(() => {
    controller = new CategoryApiGatewayController();
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should create a new category and return it', async () => {
    const postStub = sinon.stub(axios, 'post').resolves({data: mockCategory});
    const result = await controller.createCategory(mockCategory);
    expect(result).to.deepEqual(mockCategory);
    sinon.assert.calledWithExactly(
      postStub,
      'http://localhost:3003/categories',
      mockCategory,
    );
  });

  it('should return a list of categories', async () => {
    const getStub = sinon.stub(axios, 'get').resolves({data: [mockCategory]});
    const result = await controller.getAllCategories();
    expect(result).to.deepEqual([mockCategory]);
    sinon.assert.calledWithExactly(getStub, 'http://localhost:3003/categories');
  });

  it('should return a single category by ID', async () => {
    const getStub = sinon.stub(axios, 'get').resolves({data: mockCategory});
    const result = await controller.getCategoryById('c1');
    expect(result).to.deepEqual(mockCategory);
    sinon.assert.calledWithExactly(
      getStub,
      'http://localhost:3003/categories/c1',
    );
  });

  it('should update a category and return updated data', async () => {
    const patchStub = sinon.stub(axios, 'patch').resolves({data: mockCategory});
    const result = await controller.updateCategory('c1', mockCategory);
    expect(result).to.deepEqual(mockCategory);
    sinon.assert.calledWithExactly(
      patchStub,
      'http://localhost:3003/categories/c1',
      mockCategory,
    );
  });

  it('should delete a category and return deleted category data', async () => {
    const delStub = sinon.stub(axios, 'delete').resolves({data: mockCategory});
    const result = await controller.deleteCategory('c1');
    expect(result).to.deepEqual(mockCategory);
    sinon.assert.calledWithExactly(
      delStub,
      'http://localhost:3003/categories/c1',
    );
  });
});
