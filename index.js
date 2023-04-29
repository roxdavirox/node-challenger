const express = require('express');

const xlsx = require('xlsx');
const pdfkit = require('pdfkit');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
