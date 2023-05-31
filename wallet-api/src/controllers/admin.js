const pool = require('../db');

// Increase user cryptocurrency balance
const increaseBalance = async (req, res) => {
  try {
    const { userId } = req.params;

    const { amount } = req.body;

    const user = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);

    const currentBalance = user.balance;

    const newBalance = currentBalance + amount;

    await pool.query('UPDATE users SET balance = ? WHERE id = ?', [newBalance, userId]);

    res.status(200).json({ message: 'User balance increased successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Decrease user cryptocurrency balance
const decreaseBalance = async (req, res) => {
  try {
    const { userId } = req.params;

    const { amount } = req.body;

    const user = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);

    const currentBalance = user.balance;

    const newBalance = currentBalance - amount;

    await pool.query('UPDATE users SET balance = ? WHERE id = ?', [newBalance, userId]);

    res.status(200).json({ message: 'User balance decreased successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get total balance of all cryptocurrencies
const getTotalBalance = async (req, res) => {
  try {
    const users = await pool.query('SELECT * FROM users');

    let totalBalance = 0;

    for (const user of users) {
      totalBalance += user.balance;
    }

    res.status(200).json({ balance: totalBalance });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Add new cryptocurrency to the wallet
const addCryptocurrency = async (req, res) => {
  try {
    const { name, symbol } = req.body;

    await pool.query('INSERT INTO cryptocurrencies (name, symbol) VALUES (?, ?)', [name, symbol]);

    res.status(200).json({ message: 'Cryptocurrency added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Manage exchange rate between cryptocurrencies
const manageExchangeRate = async (req, res) => {
  try {
    const { fromCurrency, toCurrency, rate } = req.body;

    await pool.query('UPDATE exchange_rates SET rate = ? WHERE from_currency = ? AND to_currency = ?', [rate, fromCurrency, toCurrency]);

    res.status(200).json({ message: 'Exchange rate managed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  increaseBalance,
  decreaseBalance,
  getTotalBalance,
  addCryptocurrency,
  manageExchangeRate,
};
