# Product Management API

This is a simple Product Management API built with Node.js, Express, MongoDB, and JWT for authentication. The API allows users to sign up, sign in, and manage products. 

## Features
- User Authentication (Sign Up and Sign In)
- Product Management (Add, Update, Delete, and Retrieve Products)
- JWT Authentication for protected routes

## Prerequisites
- Node.js and npm installed
- MongoDB instance (local or cloud)

## Setup Instructions

### 1. Clone the repository
```bash
git clone <repository-url>
cd <repository-directory>
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory and add the following environment variables:
```env
PORT=3000
MONGODB_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
```

### 4. Set up MongoDB
Ensure you have MongoDB running either locally or via a cloud service like MongoDB Atlas. Update the `MONGODB_URI` in the `.env` file with your MongoDB connection string.

### 5. Run the server
```bash
npm start
```
The server should now be running on `http://localhost:3000`.

## API Endpoints

### Authentication

#### Sign Up
- **Endpoint**: `/api/signup`
- **Method**: `POST`
- **Body**: 
  ```json
  {
    "username": "example",
    "email": "example@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  - `200 OK`: User created successfully
  - `400 Bad Request`: Missing required fields
  - `409 Conflict`: Email already exists
  - `500 Internal Server Error`: Server error

#### Sign In
- **Endpoint**: `/api/signin`
- **Method**: `POST`
- **Body**: 
  ```json
  {
    "email": "example@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  - `200 OK`: Returns JWT token and user data
  - `401 Unauthorized`: Invalid credentials
  - `500 Internal Server Error`: Server error

### Products

#### Get All Products
- **Endpoint**: `/api/products`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <JWT Token>`
- **Response**:
  - `200 OK`: Returns list of products
  - `401 Unauthorized`: Missing or invalid token
  - `500 Internal Server Error`: Server error

#### Get Product by ID
- **Endpoint**: `/api/products/:id`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <JWT Token>`
- **Response**:
  - `200 OK`: Returns product data
  - `404 Not Found`: Product not found
  - `401 Unauthorized`: Missing or invalid token
  - `500 Internal Server Error`: Server error

#### Add Product
- **Endpoint**: `/api/products/add`
- **Method**: `POST`
- **Headers**: `Authorization: Bearer <JWT Token>`
- **Body**:
  ```json
  {
    "title": "Product Title",
    "description": "Product Description",
    "duedate": "2024-12-31",
    "priority": "High",
    "status": "Pending"
  }
  ```
- **Response**:
  - `200 OK`: Product added successfully
  - `401 Unauthorized`: Missing or invalid token
  - `500 Internal Server Error`: Server error

#### Update Product by ID
- **Endpoint**: `/api/products/:id`
- **Method**: `PUT`
- **Headers**: `Authorization: Bearer <JWT Token>`
- **Body**:
  ```json
  {
    "title": "Updated Title",
    "description": "Updated Description",
    "duedate": "2024-12-31",
    "priority": "Medium",
    "status": "Completed"
  }
  ```
- **Response**:
  - `200 OK`: Product updated successfully
  - `404 Not Found`: Product not found
  - `401 Unauthorized`: Missing or invalid token
  - `500 Internal Server Error`: Server error

#### Delete Product by ID
- **Endpoint**: `/api/products/:id`
- **Method**: `DELETE`
- **Headers**: `Authorization: Bearer <JWT Token>`
- **Response**:
  - `200 OK`: Product deleted successfully
  - `404 Not Found`: Product not found
  - `401 Unauthorized`: Missing or invalid token
  - `500 Internal Server Error`: Server error

## Testing the API

You can use tools like [Postman](https://www.postman.com/) or [curl](https://curl.se/) to test the API endpoints.

### Example with curl
1. Sign Up
    ```bash
    curl -X POST http://localhost:3000/api/signup \
    -H "Content-Type: application/json" \
    -d '{"username":"example","email":"example@example.com","password":"password123"}'
    ```
2. Sign In
    ```bash
    curl -X POST http://localhost:3000/api/signin \
    -H "Content-Type: application/json" \
    -d '{"email":"example@example.com","password":"password123"}'
    ```
    Save the token from the response.
3. Add a Product
    ```bash
    curl -X POST http://localhost:3000/api/products/add \
    -H "Authorization: Bearer <JWT Token>" \
    -H "Content-Type: application/json" \
    -d '{"title":"Product Title","description":"Product Description","duedate":"2024-12-31","priority":"High","status":"Pending"}'
    ```
4. Get All Products
    ```bash
    curl -X GET http://localhost:3000/api/products \
    -H "Authorization: Bearer <JWT Token>"
    ```

## Contributing
Feel free to contribute to this project by submitting a pull request or opening an issue.
