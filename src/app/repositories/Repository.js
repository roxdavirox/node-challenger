const db = require('../../data/database');

class Repository {
  constructor(table) {
    this.table = table;
  }

  async getAll() {
    try {
      const results = await db.promise().query(`SELECT * FROM ${this.table}`);
      return results[0];
    } catch (error) {
      console.error(error);
      throw new Error('Internal Server Error');
    }
  }

  async getById(id) {
    try {
      const results = await db.promise().query(`SELECT * FROM ${this.table} WHERE id = ?`, [id]);
      return results[0][0];
    } catch (error) {
      console.error(error);
      throw new Error('Internal Server Error');
    }
  }

  async create(entity) {
    try {
      const results = await db.promise().query(`INSERT INTO ${this.table} SET ?`, [entity]);
      const id = results[0].insertId;
      return await this.getById(id);
    } catch (error) {
      console.error(error);
      throw new Error('Internal Server Error');
    }
  }

  async update(id, entity) {
    try {
      await db.promise().query(`UPDATE ${this.table} SET ? WHERE id = ?`, [entity, id]);
      return await this.getById(id);
    } catch (error) {
      console.error(error);
      throw new Error('Internal Server Error');
    }
  }

  async delete(id) {
    try {
      const entity = await this.getById(id);
      await db.promise().query(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
      return entity;
    } catch (error) {
      console.error(error);
      throw new Error('Internal Server Error');
    }
  }

  async deleteEntityAndAssociations(id, associations) {
    try {
      const deletePromises = associations.map((tableName) => {
        return db.promise().query(`DELETE FROM ${tableName} WHERE category_id = ?`, [id]);
      });

      await Promise.all(deletePromises);

      const entity = await this.delete(id);
      return entity;
    } catch (error) {
      console.error(error);
      throw new Error('Internal Server Error');
    }
  }

}

module.exports = Repository;
