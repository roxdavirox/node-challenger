const Expense = require('../models/Expense');

exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll();
    res.json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getExpenseById = async (req, res) => {
  const { id } = req.params;
  try {
    const expense = await Expense.findByPk(id);
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
  const { title, amount, paymentTypeId } = req.body;
  try {
    const expense = await Expense.create({ title, amount, paymentTypeId });
    res.json(expense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.updateExpense = async (req, res) => {
  const { id } = req.params;
  const { title, amount, paymentTypeId } = req.body;
  try {
    const expense = await Expense.findByPk(id);
    if (expense) {
      await expense.update({ title, amount, paymentTypeId });
      res.json(expense);
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
    const expense = await Expense.findByPk(id);
    if (expense) {
      await expense.destroy();
      res.json({ message: `Expense with id ${id} deleted successfully` });
    } else {
      res.status(404).json({ message: `Expense with id ${id} not found` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
