const express = require('express');

const xlsx = require('xlsx');
const pdfkit = require('pdfkit');
const routes = require('./src/app/routes/routes');

require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
