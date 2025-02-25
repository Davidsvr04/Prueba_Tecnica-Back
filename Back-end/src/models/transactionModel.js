const pool = require('../config/db');

const createTransaction = async (user_id, amount, type) => {
  const result = await pool.query(
    'INSERT INTO transactions (user_id, amount, type) VALUES ($1, $2, $3) RETURNING *',
    [user_id, amount, type]
  );
  return result.rows[0];
};

const getTransactionsByUser = async (user_id) => {
  const result = await pool.query(
    'SELECT * FROM transactions WHERE user_id = $1 ORDER BY created_at DESC',
    [user_id]
  );
  return result.rows;
};

module.exports = { createTransaction, getTransactionsByUser };