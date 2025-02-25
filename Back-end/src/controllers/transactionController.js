const pool = require('../config/db');

const createTransactionController = async (req, res) => {
  const { user_id, amount, type } = req.body;

  try {
    // Validar transaccion negativa
    if (amount <= 0) {
      return res.status(400).json({ error: 'El monto a depositar debe ser positivo' });
    }

    const user = await pool.query('SELECT balance FROM users WHERE id = $1', [user_id]);
    if (user.rows.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const currentBalance = parseFloat(user.rows[0].balance);

    // Validar si el saldo es suficiente para retiros
    if (type === 'withdrawal' && currentBalance < amount) {
      return res.status(400).json({ error: 'Saldo insuficiente, intente de nuevo' });
    }

    // Calcular el nuevo saldo
    const newBalance = type === 'deposit' ? currentBalance + amount : currentBalance - amount;

    // Actualizar el saldo del usuario
    await pool.query('UPDATE users SET balance = $1 WHERE id = $2', [newBalance, user_id]);

    // Registrar la transacción
    const newTransaction = await pool.query(
      'INSERT INTO transactions (user_id, amount, type) VALUES ($1, $2, $3) RETURNING *',
      [user_id, amount, type]
    );

    res.status(201).json(newTransaction.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

const getTransactionsByUserController = async (req, res) => {
  const { user_id } = req.params;

  try {
    const transactions = await pool.query(
      'SELECT * FROM transactions WHERE user_id = $1 ORDER BY created_at DESC',
      [user_id]
    );
    res.json(transactions.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

module.exports = {
  createTransactionController,
  getTransactionsByUserController,
};