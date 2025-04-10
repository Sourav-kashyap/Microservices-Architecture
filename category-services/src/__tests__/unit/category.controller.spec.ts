import {expect} from '@loopback/testlab';
import {Count} from '@loopback/repository';
import sinon from 'sinon';

import {CategoryController} from '../../controllers';
import {CategoryRepository} from '../../repositories';
import {Category} from '../../models';

describe('CategoryControllerTesting', () => {
  let categoryController: CategoryController;
  let categoriesRepositoryStub: sinon.SinonStubbedInstance<CategoryRepository>;

  beforeEach(() => {
    categoriesRepositoryStub = sinon.createStubInstance(
      CategoryRepository,
    ) as sinon.SinonStubbedInstance<CategoryRepository>;

    categoryController = new CategoryController(categoriesRepositoryStub);
  });

  it('should create a new category', async () => {
    const newCategory = new Category({categoryId: 'c1', name: 'New Category'});
    categoriesRepositoryStub.create.resolves(newCategory);
    const result = await categoryController.create(newCategory);
    expect(result).to.eql(newCategory);
    sinon.assert.calledOnce(categoriesRepositoryStub.create);
  });

  it('should return count of categories', async () => {
    const count: Count = {count: 10};
    categoriesRepositoryStub.count.resolves(count);
    const result = await categoryController.count();
    expect(result).to.eql(count);
    sinon.assert.calledOnce(categoriesRepositoryStub.count);
  });

  it('should return all categories', async () => {
    const categoriesArray = [
      new Category({categoryId: 'c1', name: 'Category 1'}),
      new Category({categoryId: 'c2', name: 'Category 2'}),
    ];
    categoriesRepositoryStub.find.resolves(categoriesArray);
    const result = await categoryController.find();
    expect(result).to.eql(categoriesArray);
    sinon.assert.calledOnce(categoriesRepositoryStub.find);
  });

  it('should update all categories ', async () => {
    const count: Count = {count: 2};
    const categoryUpdate = {name: 'Updated Category'};
    categoriesRepositoryStub.updateAll.resolves(count);
    const result = await categoryController.updateAll(
      new Category(categoryUpdate),
    );
    expect(result).to.eql(count);
    sinon.assert.calledOnce(categoriesRepositoryStub.updateAll);
  });

  it('should find categories by id', async () => {
    const categoriesArray = [
      new Category({categoryId: 'c1', name: 'Category 1'}),
      new Category({categoryId: 'c2', name: 'Category 2'}),
    ];
    const id: string = 'c1';
    categoriesRepositoryStub.findById.resolves(categoriesArray[0]);
    const result = await categoryController.findById(id);
    expect(result).to.eql(categoriesArray[0]);
    sinon.assert.calledOnce(categoriesRepositoryStub.findById);
  });

  it('should update a category by id', async () => {
    const id = 'c1';
    const categoryUpdate = {name: 'Updated Name'};
    categoriesRepositoryStub.updateById.resolves();
    await categoryController.updateById(id, categoryUpdate);
    sinon.assert.calledOnce(categoriesRepositoryStub.updateById);
  });

  it('should replace a category by id', async () => {
    const id = 'c1';
    const category = new Category({categoryId: id, name: 'Replaced Category'});
    categoriesRepositoryStub.replaceById.resolves();
    await categoryController.replaceById(id, category);
    sinon.assert.calledOnce(categoriesRepositoryStub.replaceById);
  });

  it('should delete a category by id', async () => {
    const categoryId = '1';
    categoriesRepositoryStub.deleteById.resolves();
    await categoryController.deleteById(categoryId);
    sinon.assert.calledOnce(categoriesRepositoryStub.deleteById);
  });
});
