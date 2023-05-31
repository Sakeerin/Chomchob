const pool = require('../db');

// Transfer cryptocurrency to another user
const transferCryptocurrency = async (req, res) => {
  try {
    const { senderId, recipientId, amount } = req.body;

    const sender = await pool.query('SELECT * FROM users WHERE id = ?', [senderId]);

    const senderBalance = sender.balance;

    const senderNewBalance = senderBalance - amount;

    await pool.query('UPDATE users SET balance = ? WHERE id = ?', [senderNewBalance, senderId]);

    const recipient = await pool.query('SELECT * FROM users WHERE id = ?', [recipientId]);
    
    const recipientBalance = recipient.balance;

    const recipientNewBalance = recipientBalance + amount;

    await pool.query('UPDATE users SET balance = ? WHERE id = ?', [recipientNewBalance, recipientId]);

    res.status(200).json({ message: 'Cryptocurrency transferred successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  transferCryptocurrency,
};
