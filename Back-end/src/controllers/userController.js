const { createUser, getUsers } = require('../models/userModel');
const pool = require('../config/db');

const createUserController = async (req, res) => {
  const { name, email } = req.body;

  try {
    const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: 'El email ya está registrado, intenta con uno nuevo' });
    }

    const newUser = await createUser(name, email);
    res.status(201).json(newUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

const getUsersController = async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

module.exports = { createUserController, getUsersController };