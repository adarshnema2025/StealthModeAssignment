# User Management API
A simple RESTful API built with Node.js, Express.js, and MongoDB for managing users with CRUD operations and JWT-based authentication.

## Overview
This API provides endpoints for user signup, login, and CRUD operations (Create, Read, Update, Delete) on user data. Protected routes require a JWT token obtained from signup or login.

## Features
- User Authentication**: JWT-based signup and login.
- CRUD Operations**: Create, retrieve, update, and delete users.
- Secure Routes**: Protected endpoints using JWT middleware.
- Error Handling**: Basic error responses for invalid requests.

## Prerequisites
- Node.js: Version 20.x or later (tested with v20.16.0).
- MongoDB: Local instance or cloud (e.g., MongoDB Atlas).
- Git: For version control.
- Postman: For testing API endpoints.

## Project Structure

user-management-api/
├── config/
│   └── db.js              # MongoDB connection setup
├── controllers/
│   ├── authController.js  # Signup and login logic
│   └── userController.js  # User CRUD logic
├── middlewares/
│   ├── auth.js            # JWT authentication middleware
│   └── errorHandler.js    # Error handling middleware
├── models/
│   └── User.js            # User schema for MongoDB
├── routes/
│   ├── auth.js            # Authentication routes
│   └── users.js           # User CRUD routes
├── .env                   # Environment variables
├── package.json           # Dependencies and scripts
└── server.js              # Main server file


## Setup Instructions

### 1. Clone the Repository
```
git clone https://github.com/<your-username>/<your-repository>.git
cd user-management-api
```
Replace `<your-username>` and `<your-repository>` with your GitHub details.

### 2. Install Dependencies
```bash
npm install
```
This installs required packages: `express`, `mongoose`, `jsonwebtoken`, `bcryptjs`, `dotenv`, and `nodemon` (dev dependency).

### 3. Configure Environment Variables
Create a `.env` file in the root directory:
```
PORT=3000
MONGO_URI=mongodb://localhost:27017/user_management
JWT_SECRET=your_jwt_secret_key_here
```
- **PORT**: Port for the server (default: 3000).
- **MONGO_URI**: MongoDB connection string (update if using a cloud service).
- **JWT_SECRET**: A strong, unique secret for JWT (e.g., generate with `openssl rand -hex 32`).

### 4. Start MongoDB
- **Local MongoDB**:
  - Install MongoDB if not already installed ([MongoDB Community Server](https://www.mongodb.com/try/download/community)).
  - Run in a separate terminal:
    ```bash
    mongod
    ```
- **MongoDB Atlas**: Replace `MONGO_URI` in `.env` with your Atlas connection string.

### 5. Run the Server
```bash
npm start
```
- Uses `nodemon` to auto-restart on changes.
- You should see:
  ```
  Server running on port 3000
  MongoDB connected
  ```

## Usage

### Testing with Postman
1. **Download Postman**: Install from [postman.com](https://www.postman.com/downloads/).
2. **Base URL**: `http://localhost:3000` (adjust if `PORT` changes).
3. **Authentication**: Protected routes require a JWT token in the `Authorization` header as `Bearer <token>`.

### API Endpoints

#### Authentication
- **Signup**
  - **Method**: `POST`
  - **URL**: `http://localhost:3000/api/auth/signup`
  - **Headers**: `Content-Type: application/json`
  - **Body**:
    ```json
    {
      "name": "John Doe",
      "email": "john@example.com",
      "password": "password123"
    }
    ```
  - **Response**: `201 Created`
    ```json
    { "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }
    ```

- **Login**
  - **Method**: `POST`
  - **URL**: `http://localhost:3000/api/auth/login`
  - **Headers**: `Content-Type: application/json`
  - **Body**:
    ```json
    {
      "email": "john@example.com",
      "password": "password123"
    }
    ```
  - **Response**: `200 OK`
    ```json
    { "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }
    ```

#### User CRUD (Protected Routes)
All require `Authorization: Bearer <token>` in headers.

- **Create User**
  - **Method**: `POST`
  - **URL**: `http://localhost:3000/api/users`
  - **Headers**: 
    - `Authorization: Bearer <token>`
    - `Content-Type: application/json`
  - **Body**:
    ```json
    {
      "name": "Jane Smith",
      "email": "jane@example.com",
      "role": "user"
    }
    ```
  - **Response**: `201 Created`
    ```json
    { "_id": "66f...", "name": "Jane Smith", "email": "jane@example.com", "role": "user", ... }
    ```

- **Get All Users**
  - **Method**: `GET`
  - **URL**: `http://localhost:3000/api/users`
  - **Headers**: `Authorization: Bearer <token>`
  - **Response**: `200 OK`
    ```json
    [
      { "_id": "66f...", "name": "John Doe", "email": "john@example.com", "role": "user", ... },
      { "_id": "66f...", "name": "Jane Smith", "email": "jane@example.com", "role": "user", ... }
    ]
    ```

- **Get Single User**
  - **Method**: `GET`
  - **URL**: `http://localhost:3000/api/users/<id>` (e.g., `66f...`)
  - **Headers**: `Authorization: Bearer <token>`
  - **Response**: `200 OK`
    ```json
    { "_id": "66f...", "name": "Jane Smith", "email": "jane@example.com", "role": "user", ... }
    ```

- **Update User**
  - **Method**: `PUT`
  - **URL**: `http://localhost:3000/api/users/<id>` (e.g., `66f...`)
  - **Headers**: 
    - `Authorization: Bearer <token>`
    - `Content-Type: application/json`
  - **Body**:
    ```json
    {
      "name": "Jane Updated",
      "email": "jane.updated@example.com",
      "role": "admin"
    }
    ```
  - **Response**: `200 OK`
    ```json
    { "_id": "66f...", "name": "Jane Updated", "email": "jane.updated@example.com", "role": "admin", ... }
    ```

- **Delete User**
  - **Method**: `DELETE`
  - **URL**: `http://localhost:3000/api/users/<id>` (e.g., `66f...`)
  - **Headers**: `Authorization: Bearer <token>`
  - **Response**: `200 OK`
    ```json
    { "message": "User deleted" }
    ```

### Notes
- **Object ID**: Replace `<id>` with a user’s `_id` from `GET /api/users`.
- **Token**: Obtain from signup/login; expires in 1 hour.
- **Errors**: 
  - `401 Unauthorized`: Missing/invalid token.
  - `404 Not Found`: Invalid user ID.
  - `500 Internal Server Error`: Check server logs.

## Pushing to GitHub
1. Initialize Git (if not done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```
2. Set remote:
   ```bash
   git remote add origin https://github.com/<your-username>/<your-repository>.git
   ```
3. Push:
   ```bash
   git push -u origin main
   ```
   - Use HTTPS or configure SSH keys (see [GitHub SSH Docs](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)).

## Contributing
Feel free to fork and submit pull requests!

## License
MIT License

---

### Instructions to Use This README
1. Save this as `README.md` in your project root (`D:\user-management-api\ProjectFolder`).
2. Replace `<your-username>` and `<your-repository>` with your actual GitHub details.
3. Update `MONGO_URI` or `JWT_SECRET` examples in the `.env` section if using a specific setup.
4. Commit and push:
   ```powershell
   git add README.md
   git commit -m "Add README with setup instructions"
   git push
   ```

This `README.md` provides clear, concise instructions for anyone setting up and testing your API, including endpoint details for Postman. Let me know if you’d like to adjust anything!
