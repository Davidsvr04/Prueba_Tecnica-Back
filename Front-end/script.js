const API_URL = 'http://localhost:3000/api';

const userListSection = document.getElementById('user-list');
const transactionListSection = document.getElementById('transaction-list');
const usersTableBody = document.querySelector('#users-table tbody');
const transactionsTableBody = document.querySelector('#transactions-table tbody');
const userForm = document.getElementById('user-form');
const transactionForm = document.getElementById('transaction-form');
const backButton = document.getElementById('back-button');
const userIdSpan = document.getElementById('user-id');

let currentUserId = null;
document.addEventListener('DOMContentLoaded', loadUsers);

// Agregar un usuario
userForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('user-name').value;
  const email = document.getElementById('user-email').value;

  // Verificar si el usuario ya existe
  const users = await fetch(`${API_URL}/users`).then(res => res.json());
  const userExists = users.some(user => user.email === email);

  if (userExists) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'El correo electrónico ya está registrado.',
    });
    return;
  }

  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email }),
  });

  if (response.ok) {
    Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: 'Usuario creado correctamente.',
    });
    loadUsers();
    userForm.reset();
  }
});

// Ver transacciones de un usuario
function viewTransactions(userId) {
  currentUserId = userId;
  userListSection.style.display = 'none';
  transactionListSection.style.display = 'block';
  userIdSpan.textContent = userId;
  loadTransactions(userId);
}

// Volver a la lista de usuarios
backButton.addEventListener('click', () => {
  transactionListSection.style.display = 'none';
  userListSection.style.display = 'block';
});

// Agregar una transacción
transactionForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const amount = parseFloat(document.getElementById('transaction-amount').value);
  const type = document.getElementById('transaction-type').value;

  try {
    // Validar monto negativo
    if (amount <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El monto debe ser positivo.',
      });
      return;
    }

    // Registrar la transacción
    const response = await fetch(`${API_URL}/transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: currentUserId, amount, type }),
    });

    if (!response.ok) {
      const errorData = await response.json(); // Leer el mensaje de error del backend
      throw new Error(errorData.error || 'Error al registrar la transacción');
    }

    Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: 'Transacción registrada correctamente.',
    });

    // Recargar las transacciones
    loadTransactions(currentUserId);
    transactionForm.reset();
  } catch (error) {
    console.error('Error:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.message || 'No se pudo registrar la transacción.',
    });
  }
});

// Cargar usuarios
async function loadUsers() {
  const response = await fetch(`${API_URL}/users`);
  const users = await response.json();

  usersTableBody.innerHTML = '';
  users.forEach(user => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.balance}</td>
      <td><button onclick="viewTransactions(${user.id})">Ver Transacciones</button></td>
    `;
    usersTableBody.appendChild(row);
  });
}

// Cargar transacciones
async function loadTransactions(userId) {
  const response = await fetch(`${API_URL}/transactions/${userId}`);
  const transactions = await response.json();

  transactionsTableBody.innerHTML = '';
  transactions.forEach(transaction => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${transaction.id}</td>
      <td>${transaction.amount}</td>
      <td class="${transaction.type}">${transaction.type}</td>
      <td>${new Date(transaction.created_at).toLocaleString()}</td>
    `;
    transactionsTableBody.appendChild(row);
  });
}