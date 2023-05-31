const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'wallet_db',
  connectionLimit: 5,
});

module.exports = pool;
