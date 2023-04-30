const ExpenseRepository = require('../repositories/ExpenseRepository');

exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await ExpenseRepository.getAll();
    res.json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getExpenseById = async (req, res) => {
  const { id } = req.params;
  try {
    const expense = await ExpenseRepository.getById(id);
    if (expense) {
      res.json(expense);
    } else {
      res.status(404).json({ message: `Expense with id ${id} not found` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.createExpense = async (req, res) => {
  const { value, purchase_date, description, payment_type_id, category_id } = req.body;
  try {
    const expense = await ExpenseRepository.create({
      value,
      purchase_date,
      description,
      payment_type_id,
      category_id
    });
    res.json(expense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.updateExpense = async (req, res) => {
  const { id } = req.params;
  const { value, purchase_date, description, payment_type_id, category_id } = req.body;
  try {
    const foundExpense = await ExpenseRepository.getById(id);
    if (foundExpense) {
      const updatedExpense = await ExpenseRepository.update(id, {
        value,
        purchase_date,
        description,
        payment_type_id,
        category_id
      });
      res.json(updatedExpense);
    } else {
      res.status(404).json({ message: `Expense with id ${id} not found` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.partialUpdateExpense = async (req, res) => {
  const { id } = req.params;
  const fieldsToUpdate = req.body;

  try {
    const foundExpense = await ExpenseRepository.getById(id);
    if (foundExpense) {

      const validFields = Object.keys(fieldsToUpdate).every(field => foundExpense.hasOwnProperty(field));
      if (!validFields) {
        return res.status(400).json({ message: 'One or more invalid fields provided' });
      }

      const updatedExpense = await ExpenseRepository.update(id, { ...foundExpense, ...fieldsToUpdate });
      res.json(updatedExpense);
    } else {
      res.status(404).json({ message: `Expense with id ${id} not found` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  try {
    const foundExpense = await ExpenseRepository.getById(id);
    if (foundExpense) {
      await ExpenseRepository.delete(id);
      res.json({ message: `Expense with id ${id} deleted successfully` });
    } else {
      res.status(404).json({ message: `Expense with id ${id} not found` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
