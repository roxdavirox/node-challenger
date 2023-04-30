const db = require('../../data/database');
const Repository = require('./Repository');

class ExpenseRepository extends Repository {
  constructor() {
    super('expenses');
  }

  async getAll(limit = 100, offset= 0) {
    try {
      const results = await db.promise().query(`SELECT * FROM ${this.table} ORDER BY purchase_date DESC LIMIT ? OFFSET ?`, [limit, offset]);
      const expenses = results[0];
      const count = results[1][0]['count(*)'];
      return { expenses, count };
    } catch (error) {
      console.error(error);
      throw new Error('Internal Server Error');
    }
  }
}

module.exports = new ExpenseRepository();
