const Repository = require('./Repository');

class CategoryRepository extends Repository {
  constructor() {
    super('categories');
  }
}

module.exports = new CategoryRepository();
