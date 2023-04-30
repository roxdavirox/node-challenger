const Repository = require('./Repository');

class ExpenseRepository extends Repository {
  constructor() {
    super('expenses');
  }
}

module.exports = new ExpenseRepository();
