import {expect} from '@loopback/testlab';
import sinon from 'sinon';
import {AuthorController} from '../../controllers';
import {AuthorRepository} from '../../repositories';
import {Author} from '../../models';
import {Count} from '@loopback/repository';

describe('AuthorController', () => {
  let authorController: AuthorController;
  let authorRepositoryStub: sinon.SinonStubbedInstance<AuthorRepository>;

  beforeEach(() => {
    authorRepositoryStub = sinon.createStubInstance(
      AuthorRepository,
    ) as sinon.SinonStubbedInstance<AuthorRepository>;
    authorController = new AuthorController(authorRepositoryStub);
  });

  it('should create a new author', async () => {
    const newAuthor = new Author({
      authorId: 'a1',
      name: 'Author 1',
    });

    authorRepositoryStub.create.resolves(newAuthor);
    const result = await authorController.create(newAuthor);
    expect(result).to.deepEqual(newAuthor);
    sinon.assert.calledOnce(authorRepositoryStub.create);
  });

  it('should return count of authors', async () => {
    const count: Count = {count: 10};
    authorRepositoryStub.count.resolves(count);
    const result = await authorController.count();
    expect(result).to.eql(count);
    sinon.assert.calledOnce(authorRepositoryStub.count);
  });

  it('should return an array of authors', async () => {
    const authors = [
      new Author({
        authorId: 'a1',
        name: 'Author 1',
      }),
      new Author({
        authorId: 'a2',
        name: 'Author 1',
      }),
    ];

    authorRepositoryStub.find.resolves(authors);
    const result = await authorController.find();
    expect(result).to.equal(authors);
    sinon.assert.calledOnce(authorRepositoryStub.find);
  });

  it('should return the author by id', async () => {
    const author = new Author({
      authorId: 'a1',
      name: 'Author 1',
    });

    const id = 'a1';

    authorRepositoryStub.findById.resolves(author);
    const result = await authorController.findById(id);
    expect(result).to.equal(author);
    sinon.assert.calledOnce(authorRepositoryStub.findById);
  });

  it('should update all authors with the given parameters', async () => {
    const count = {count: 2};
    const updatedAuthor = new Author({name: 'Updated Author'});

    authorRepositoryStub.updateAll.resolves(count);
    const result = await authorController.updateAll(updatedAuthor);
    expect(result).to.equal(count);
    sinon.assert.calledOnce(authorRepositoryStub.updateAll);
  });

  it('should update an author by id', async () => {
    const author = new Author({
      authorId: 'a1',
      name: 'Author 1',
    });
    const id = 'a1';

    authorRepositoryStub.updateById.resolves();
    await authorController.updateById(id, author);
    sinon.assert.calledOnce(authorRepositoryStub.updateById);
  });

  it('should replace an author by id', async () => {
    const author = new Author({
      name: 'Author 1',
    });
    const id = 'a1';
    authorRepositoryStub.replaceById.resolves();
    await authorController.replaceById(id, author);
    sinon.assert.calledOnce(authorRepositoryStub.replaceById);
  });

  it('should delete an author by id', async () => {
    const id = 'a1';
    authorRepositoryStub.deleteById.resolves();
    await authorController.deleteById(id);
    sinon.assert.calledOnce(authorRepositoryStub.deleteById);
  });
});
