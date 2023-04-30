const pdfkit = require('pdfkit');
const axios = require('axios');
const moment = require('moment');

const ExpenseRepository = require('../repositories/ExpenseRepository');

exports.getAllExpenses = async (req, res) => {
  try {
    const { page = 1, page_size = 5 } = req.query;
    const limit = Number(page_size) || 10;
    const offset = (Number(page) - 1) * limit || 0;

    const expenses = await ExpenseRepository.getAll(limit, offset);
    res.json(expenses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getAllExpensesPdfByDate = async (req, res) => {
  try {
    const startDate = moment(req.query.start_date).startOf('day').toISOString();
    const endDate = moment(req.query.end_date).endOf('day').toISOString();

    const result = await ExpenseRepository.getAll();

    const filteredExpenses = result.expenses.filter((expense) => {
      const purchaseDate = moment(expense.purchase_date).toISOString();
      return purchaseDate >= startDate && purchaseDate <= endDate;
    });

    const pdfDoc = new pdfkit();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename=${startDate}_${endDate}.pdf`);
    pdfDoc.pipe(res);

    pdfDoc.fontSize(18).text(`Despesas entre ${startDate} e ${endDate}`, { align: 'center' });
    pdfDoc.moveDown();
    pdfDoc.fontSize(12).text(`Data    | Descrição                                     | Valor`, { align: 'left' });

    filteredExpenses.forEach((expense) => {
      pdfDoc.moveDown();
      pdfDoc.fontSize(10)
        .text(`${new Date(expense.purchase_date)
        .toLocaleDateString('pt-BR')} | ${expense.description.padEnd(45)} | R$ ${expense.value}`, { align: 'left' });
    });

    pdfDoc.end();
  } catch(error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

exports.getAddress = async (req, res) => {
  const { zipcode, number } = req.query;

  try {
    const response = await axios.get(`https://viacep.com.br/ws/${zipcode}/json/`);
    const { logradouro, bairro, localidade, uf } = response.data;

    const address = {
      street: logradouro,
      neighborhood: bairro,
      city: localidade,
      state: uf,
      zipcode,
      number
    };

    res.json(address);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
}

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
