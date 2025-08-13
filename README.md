# Node.js + TypeScript + MongoDB User Registration API

A simple Node.js REST API built with **TypeScript**, **Express**, and **MongoDB** (via Mongoose).  
The API provides:
- A simple **GET** endpoint that returns server status and timestamp.
- A **POST** registration endpoint (`/api/v1/auth/register`) to create a new user with input validation and password hashing.

## Project Structure
```plaintext
├── src/
│ ├── app.ts # Express app setup (middlewares, routes, health GET)
│ ├── server.ts # Server bootstrap (reads PORT, starts app)
│ ├── config/
│ │ └── db.ts # Mongoose connection helper
│ ├── controllers/
│ │ └── authController.ts # registerUser handler
│ ├── middlewares/
│ │ └── validateRequest.ts # Joi request body validation
│ ├── models/
│ │ └── User.ts # User schema & model
│ ├── routes/
│ │ └── authRoutes.ts # /api/v1/auth routes (POST /register)
│ └── utils/
│ └── hashPassword.ts # bcrypt hashing helper
├── .env
├── .gitignore # Node/TS ignores
├── package.json
├── tsconfig.json
└── README.md
```

## Features

- **TypeScript** for type safety
- **Express** for API routing
- **Mongoose** for MongoDB modeling
- **Joi** for input validation
- **bcrypt** for password hashing
- **dotenv** for environment variable management

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16+ recommended) → [Download](https://nodejs.org/)
- **MongoDB** (local or cloud) → [Installation Guide](https://www.mongodb.com/docs/manual/installation/)
- **npm** or **yarn** package manager


## Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/debb-major/nodejs-server.git
   
   cd nodejs-server
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Create a ```.env``` file in the root directory**
4. **Start MongoDB locally**
   ```bash
   mongod
   ```
5. **Run the server (development mode)**
   ```bash
   npx nodemon src/server.ts
   ```
   *or without nodemon*
   ```bash
   npx ts-node src/server.ts
   ```

## API Endpoints
1. **GET/**
*Description*: Returns API status and current timestamp.
Response Example:
```bash
{
  "status": "OK",
  "timestamp": "2025-08-13T12:00:00.000Z"
}
```
2. **POST /api/v1/auth/register**
   *Description*: Registers a new user after validating input and hashing password.
   Request Body:
   ```bash
   {
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "password": "securePassword123"
    }
   ```
   Successful Response (201):
   ```bash
     {
      "message": "User registered successfully",
      "user": {
        "_id": "64c9e8f4d2e4f5bcd1234567",
        "firstName": "John",
        "lastName": "Doe",
        "email": "john.doe@example.com",
        "password": "$2b$10$..."
      }
    }
   ```
**Error Responses:**
1. **400 Bad Request**: Invalid input or user already exists

2. **500 Internal Server Error**: Server/database issues

## Technologies Used

- Node.js
- Express
- TypeScript
- MongoDB
- Mongoose
- Joi
- bcrypt
- dotenv

## License
This project is licensed under the MIT License; feel free to use and modify it.

## Acknowledgements
- Inspired by common REST API patterns for authentication.
- Thanks to the Node.js, TypeScript, and MongoDB communities for excellent documentation.
