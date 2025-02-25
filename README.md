Prueba Técnica: Backend y Base de Datos
Este proyecto es una API RESTful desarrollada con Express.js y PostgreSQL para gestionar usuarios y sus transacciones. La API permite crear usuarios, listar usuarios, registrar transacciones (depósitos y retiros) y obtener el historial de transacciones de un usuario.

Tabla de Contenidos
Requisitos

Instalación

Configuración de la Base de Datos

Estructura del Proyecto

Endpoints

Ejemplos de Uso

Pruebas

Tecnologías Utilizadas

Autor

Requisitos
Node.js (v18 o superior)

PostgreSQL (v15 o superior)

Postman o cualquier cliente HTTP para probar los endpoints

Instalación
Clona el repositorio:

bash
Copy
git clone https://github.com/tu-usuario/prueba-tecnica.git
cd prueba-tecnica
Instala las dependencias:

bash
Copy
npm install
Crea un archivo .env en la raíz del proyecto y configura las variables de entorno:

env
Copy
DB_USER=postgres
DB_HOST=localhost
DB_NAME=prueba_tecnica
DB_PASSWORD=tu_contraseña
DB_PORT=5432
PORT=3000
Configuración de la Base de Datos
Conéctate a PostgreSQL:

bash
Copy
psql -U postgres
Crea la base de datos:

sql
Copy
CREATE DATABASE prueba_tecnica;
Conéctate a la base de datos:

sql
Copy
\c prueba_tecnica
Crea las tablas users y transactions:

sql
Copy
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  balance DECIMAL(10, 2) DEFAULT 0.00,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  type VARCHAR(10) CHECK (type IN ('deposit', 'withdrawal')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
Estructura del Proyecto
Copy
backend/
│
├── src/
│   ├── config/
│   │   └── db.js          # Conexión a PostgreSQL
│   ├── controllers/       # Lógica de los endpoints
│   │   ├── userController.js
│   │   └── transactionController.js
│   ├── models/            # Consultas a la base de datos
│   │   ├── userModel.js
│   │   └── transactionModel.js
│   ├── routes/            # Definición de rutas
│   │   ├── userRoutes.js
│   │   └── transactionRoutes.js
│   ├── middlewares/       # Middlewares personalizados
│   │   └── errorHandler.js
│   └── app.js             # Configuración principal de Express
│
├── .env                   # Variables de entorno
├── .gitignore             # Archivos y carpetas ignorados por Git
├── package.json           # Dependencias y scripts del proyecto
└── README.md              # Documentación del proyecto
Endpoints
Usuarios
Crear Usuario: POST /api/users

Body:

json
Copy
{
  "name": "Juan Pérez",
  "email": "juan@example.com"
}
Listar Usuarios: GET /api/users

Transacciones
Registrar Transacción: POST /api/transactions

Body:

json
Copy
{
  "user_id": 1,
  "amount": 100.00,
  "type": "deposit"
}
Obtener Transacciones por Usuario: GET /api/transactions/:user_id

Ejemplos de Uso
Crear un Usuario:

Endpoint: POST /api/users

Body:

json
Copy
{
  "name": "Juan Pérez",
  "email": "juan@example.com"
}
Registrar un Depósito:

Endpoint: POST /api/transactions

Body:

json
Copy
{
  "user_id": 1,
  "amount": 100.00,
  "type": "deposit"
}
Obtener Transacciones por Usuario:

Endpoint: GET /api/transactions/1

Pruebas
Inicia el servidor:

bash
Copy
node src/app.js
Usa Postman o cualquier cliente HTTP para probar los endpoints.

Tecnologías Utilizadas
Backend: Node.js, Express.js

Base de Datos: PostgreSQL

Herramientas: Postman, pg (PostgreSQL client para Node.js)

Autor
Nombre: David Santiago Viloria

Email: david_viloria04@hotmail.com

GitHub: Davidsvr04

¡Gracias por revisar mi prueba técnica! Si tienes alguna pregunta o comentario, no dudes en contactarme. 😊

Notas Adicionales

No he trabajado con angular y tuve algunos percanses con el front, lo desarrolle pero no pude probarlo
