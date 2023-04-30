const express = require('express');
const paymentTypeController = require('../controllers/paymentTypeController');
const expenseController = require('../controllers/expenseController');
const categoryController = require('../controllers/categoryController');
const router = express.Router();

// Rotas para PaymentType
router.get('/payment-types', paymentTypeController.getAllPaymentTypes);
router.get('/payment-types/:id', paymentTypeController.getPaymentTypeById);
router.post('/payment-types', paymentTypeController.createPaymentType);
router.put('/payment-types/:id', paymentTypeController.updatePaymentType);
router.delete('/payment-types/:id', paymentTypeController.deletePaymentType);

// Rotas para Expense
router.get('/expenses', expenseController.getAllExpenses);
router.get('/expenses/:id', expenseController.getExpenseById);
router.post('/expenses', expenseController.createExpense);
router.put('/expenses/:id', expenseController.updateExpense);
router.delete('/expenses/:id', expenseController.deleteExpense);

// Rotas para Category
router.get('/categories', categoryController.getAllCategories);
router.get('/categories/:id', categoryController.getCategoryById);
router.post('/categories', categoryController.createCategory);
router.put('/categories/:id', categoryController.updateCategory);
router.delete('/categories/:id', categoryController.deleteCategory);

module.exports = router;
