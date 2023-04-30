const { createPool } = require('mysql2/promise');
require('dotenv').config();

const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  connectionLimit: 10,
  queueLimit: 0,
});

const generatePaymentTypes = async () => {
  const paymentTypes = ['Dinheiro', 'Débito', 'Crédito', 'Pix'];
  const paymentTypesQuery = `INSERT INTO payment_types (type) VALUES ${paymentTypes.join(',')}`;
  const [paymentTypesResult] = await pool.execute(paymentTypesQuery);
  console.log(`Inserted ${paymentTypesResult.affectedRows} payment types`);
}

const generateCategories = async () => {
  const categories = [];
  for (let i = 0; i < 5; i++) {
    const name = 'category_' + (i + 1);
    const description = 'description_' + (i + 1);
    categories.push(`('${name}', '${description}')`);
  }
  const categoriesQuery = `INSERT INTO categories (name, description) VALUES ${categories.join(',')}`;
  const [categoriesResult] = await pool.execute(categoriesQuery);
  console.log(`Inserted ${categoriesResult.affectedRows} categories`);
}

const generateExpenses = async () => {
  const expenses = [];
  for (let i = 0; i < 10; i++) {
    const value = Math.floor(Math.random() * (5000 - 100 + 1)) + 100;
    const purchaseDate = new Date(2022, Math.floor(Math.random() * 4), Math.floor(Math.random() * 30) + 1).toISOString().slice(0, 19).replace('T', ' ');
    const description = 'expense_' + (i + 1);
    const paymentTypeId = Math.floor(Math.random() * 5) + 1;
    const categoryId = Math.floor(Math.random() * 5) + 1;
    expenses.push(`('${value}', '${purchaseDate}', '${description}', '${paymentTypeId}', '${categoryId}')`);
  }
  const expensesQuery = `INSERT INTO expenses (value, purchase_date, description, payment_type_id, category_id) VALUES ${expenses.join(',')}`;
  const [expensesResult] = await pool.execute(expensesQuery);
  console.log(`Inserted ${expensesResult.affectedRows} expenses`);
}

const seedDatabase = async () => {
  try {
    await generatePaymentTypes();
    await generateCategories();
    await generateExpenses();
  } catch (error) {
    console.error(error);
  } finally {
    pool.end();
  }
}

seedDatabase();
