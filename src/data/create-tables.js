require('dotenv').config();

const mysql = require('mysql2/promise');

const queries = [
  `CREATE TABLE payment_types (
    id INT NOT NULL AUTO_INCREMENT,
    type VARCHAR(255),
    PRIMARY KEY (id)
  ) ENGINE=INNODB;`,
  `CREATE TABLE categories (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255),
    description TEXT,
    PRIMARY KEY (id)
  ) ENGINE=INNODB;`,
  `CREATE TABLE expenses (
    id INT NOT NULL AUTO_INCREMENT,
    value DECIMAL(10,2),
    purchase_date TIMESTAMP,
    description TEXT,
    payment_type_id INT,
    category_id INT,
    PRIMARY KEY (id),
    CONSTRAINT fk_payment_type FOREIGN KEY (payment_type_id) REFERENCES payment_types(id),
    CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES categories(id)
  ) ENGINE=INNODB;`
];

(async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT
    });

    for (const query of queries) {
      await connection.query(query);
    }

    console.log('Tables created successfully');
    await connection.end();
    console.log('Connection closed');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
