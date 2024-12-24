# User Registration Endpoint Documentation

## Endpoint: `/api/v1/users/register`

### Method: POST

### Description:
This endpoint is used to register a new user. It validates the input data, hashes the password, and creates a new user in the database. Upon successful registration, it returns a JSON response containing the user details and an authentication token.

### Request Body:
The request body should be a JSON object containing the following fields~:

- `fullname`: An object containing the user's first name and last name.
    - `firstname`: A string with a minimum length of 3 characters (required).
    - `lastname`: A string (optional).
- `email`: A string representing the user's email address (required, must be a valid email).
- `password`: A string with a minimum length of 6 characters (required).

Example:
```json
{
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "password123"
}
```

### Responses:

#### Success (201 Created):
- **Description**: User registered successfully.
### POST /users/login

**Description:**
This endpoint allows users to log in to their account by providing their email and password.

**Request Body:**
- `email` (string, required): The email address of the user. Must be a valid email format.
- `password` (string, required): The password of the user. Must be at least 6 characters long.

**Response:**
- **Success (200)**: Returns a JSON object containing the authentication token and user details.
    - `token` (string): The JWT token for the authenticated user.
    - `user` (object): The user details.
        - `fullname` (object): The full name of the user.
            - `firstname` (string): The first name of the user.
            - `lastname` (string): The last name of the user.
        - `email` (string): The email address of the user.
        - `socketId` (string, optional): The socket ID of the user.

- **Error (401)**: Returns an error message if the email or password is invalid.
    - `message` (string): "Invalid email or password"

**Example Request:**
- **Body**:
    ```json
    {
        "status": 201,
        "data": {
            "token": "jwt_token_here",
            "user": {
                "_id": "user_id_here",
                "fullname": {
                    "firstname": "John",
                    "lastname": "Doe"
                },
                "email": "john.doe@example.com"
            }
        }
    }
    ```

#### Client Error (400 Bad Request):
- **Description**: Invalid input data or missing required fields.
- **Body**:
    ```json
    {
        "status": 400,
        "errors": [
            {
                "msg": "Error message here",
                "param": "parameter_name",
                "location": "body"
            }
        ]
    }
    ```

#### Server Error (500 Internal Server Error):
- **Description**: An error occurred on the server.
- **Body**:
    ```json
    {
        "status": 500,
        "message": "Internal Server Error"
    }
    ```

### Example Usage:
```bash
curl -X POST http://localhost:8000/api/v1/users/register \
-H "Content-Type: application/json" \
-d '{
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "password123"
}'
```
/**
 * @route GET /users/profile
 * @desc Get user profile
 * @access Private
 * @returns {Object} 200 - User profile fetched successfully
 * @returns {Error} 401 - Not authorized, token failed
 * @returns {Error} 404 - User not found
 */

/**
 * @route GET /users/logout
 * @desc Logout user
 * @access Private
 * @returns {Object} 200 - User logged out
 * @returns {Error} 401 - Not authorized, token failed
 */

 # Captain Routes Documentation

## Overview
This document provides detailed information about the captain-related endpoints in the system. It outlines the request structure, validation rules, and response format for each endpoint.

---

## Endpoint: `POST /captains/register`

### **Description**
This endpoint is used to register a new captain, including personal details, email, password, and vehicle information. The system validates the input data and ensures no duplicate email registrations.

---

### **Request Headers**
- `Content-Type`: `application/json` (Required)
- `Authorization`: Not required for this endpoint.

---

### **Request Body**
The request body must be in JSON format and should include the following fields:

#### **Body Parameters**
| Parameter             | Type     | Required | Description                                    |
|-----------------------|----------|----------|------------------------------------------------|
| `fullname.firstname`  | `string` | Yes      | The first name of the captain (min 3 chars).  |
| `fullname.lastname`   | `string` | Yes      | The last name of the captain.                 |
| `email`               | `string` | Yes      | The email address of the captain (unique).    |
| `password`            | `string` | Yes      | The password for the captain (min 6 chars).   |
| `vehicle.color`       | `string` | Yes      | The color of the captain's vehicle.           |
| `vehicle.plate`       | `string` | Yes      | The license plate number of the vehicle.      |
| `vehicle.capacity`    | `number` | Yes      | The seating capacity of the vehicle.          |
| `vehicle.vehicleType` | `string` | Yes      | The type of the vehicle (e.g., bike, car).    |

#### **Example Request**
```json
{
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "securePassword123",
    "vehicle": {
        "color": "Red",
        "plate": "AB 1234 XYZ",
        "capacity": 4,
        "vehicleType": "Car"
    }
}
```

---

### **Validation Rules**
- **Email**: Must be a valid email address and unique in the system.
- **Password**: Minimum 6 characters.
- **First Name**: Minimum 3 characters.
- **Vehicle Details**: All fields under `vehicle` are required.

---

### **Response Format**

#### **Success Response**
- **Status Code**: `201 Created`
- **Description**: Captain registered successfully.
- **Body**:
```json
{
    "success": true,
    "message": "Captain registered successfully",
    "data": {
        "captain": {
            "_id": "63bfbabc1234567890abcdef",
            "email": "john.doe@example.com",
            "fullname": {
                "firstname": "John",
                "lastname": "Doe"
            },
            "vehicle": {
                "color": "Red",
                "plate": "AB 1234 XYZ",
                "capacity": 4,
                "vehicleType": "Car"
            },
            "createdAt": "2024-12-24T12:34:56.789Z",
            "updatedAt": "2024-12-24T12:34:56.789Z"
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYmZiYWJjMTIzNDU2Nzg5MGFiY2RlZiIsImlhdCI6MTY5MDg0NzI2NCwiZXhwIjoxNjkwODUzMjY0fQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
    }
}
```

#### **Error Responses**

1. **Validation Error**
   - **Status Code**: `400 Bad Request`
   - **Description**: Validation errors in the request body.
   - **Body**:
   ```json
   {
       "success": false,
       "message": "Validation error",
       "errors": [
           {
               "param": "fullname.firstname",
               "msg": "First name should be at least 3 characters long"
           },
           {
               "param": "email",
               "msg": "Invalid email address"
           }
       ]
   }
   ```

2. **Duplicate Email**
   - **Status Code**: `400 Bad Request`
   - **Description**: A captain with the same email already exists.
   - **Body**:
   ```json
   {
       "success": false,
       "message": "Captain already exists with this email"
   }
   ```

3. **Server Error**
   - **Status Code**: `500 Internal Server Error`
   - **Description**: An unexpected error occurred on the server.
   - **Body**:
   ```json
   {
       "success": false,
       "message": "Internal server error"
   }
   ```

---

### **Notes**
- Ensure the `vehicle` object contains all required properties.
- Passwords are securely hashed before being stored in the database.
- The token returned can be used for subsequent authenticated requests.

---

### **Implementation**
Refer to the backend implementation for the `registerCaptain` function located in the `captain.controller.js` file.

---

### **Testing**
- Use tools like Postman or curl to test the endpoint.
- Ensure all required fields are provided in the request body.
- Check for proper error handling by omitting required fields or providing invalid values.

---

## Endpoint: `POST /captains/login`

### **Description**
This endpoint allows a captain to log in by providing valid credentials (email and password). Upon successful login, a token is generated for authentication in subsequent requests.

---

### **Request Headers**
- `Content-Type`: `application/json` (Required)
- `Authorization`: Not required for this endpoint.

---

### **Request Body**
The request body must be in JSON format and should include the following fields:

#### **Body Parameters**
| Parameter  | Type     | Required | Description                     |
|------------|----------|----------|---------------------------------|
| `email`    | `string` | Yes      | The captain's registered email. |
| `password` | `string` | Yes      | The captain's account password. |

#### **Example Request**
```json
{
    "email": "john.doe@example.com",
    "password": "securePassword123"
}
```

---

### **Response Format**

#### **Success Response**
- **Status Code**: `200 OK`
- **Description**: Login successful.
- **Body**:
```json
{
    "success": true,
    "message": "Login successful",
    "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzYmZiYWJjMTIzNDU2Nzg5MGFiY2RlZiIsImlhdCI6MTY5MDg0NzI2NCwiZXhwIjoxNjkwODUzMjY0fQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
        "captain": {
            "_id": "63bfbabc1234567890abcdef",
            "email": "john.doe@example.com",
            "fullname": {
                "firstname": "John",
                "lastname": "Doe"
            },
            "vehicle": {
                "color": "Red",
                "plate": "AB 1234 XYZ",
                "capacity": 4,
                "vehicleType": "Car"
            }
        }
    }
}
```

#### **Error Responses**

1. **Invalid Credentials**
   - **Status Code**: `401 Unauthorized`
   - **Description**: Invalid email or password.
   - **Body**:
   ```json
   {
       "success": false,
       "message": "Invalid email or password"
   }
   ```

2. **Server Error**
   - **Status Code**: `500 Internal Server Error`
   - **Description**: An unexpected error occurred on the server.
   - **Body**:
   ```json
   {
       "success": false,
       "message": "Internal server error"
   }
   ```

---

## Endpoint: `GET /captains/profile`

### **Description**
This endpoint retrieves the profile of the authenticated captain.

---

### **Request Headers**
- `Authorization`: `Bearer <token>` (Required)

---

### **Response Format**

#### **Success Response**
- **Status Code**: `200 OK`
- **Description**: Profile retrieved successfully.
- **Body**:
```json
{
    "success": true,
    "message": "Profile retrieved successfully",
    "data": {
        "captain": {
            "_id": "63bfbabc1234567890abcdef",
            "email": "john.doe@example.com",
            "fullname": {
                "firstname": "John",
                "lastname": "Doe"
            },
            "vehicle": {
                "color": "Red",
                "plate": "AB 1234 XYZ",
                "capacity": 4,
                "vehicleType": "Car"
            }
        }
    }
}
```

#### **Error Responses**

1. **Unauthorized**
   - **Status Code**: `401 Unauthorized`
   - **Description**: Token is missing or invalid.
   - **Body**:
   ```json
   {
       "success": false,
       "message": "Not authorized, token failed"
   }
   ```

---

## Endpoint: `POST /captains/logout`

### **Description**
This endpoint logs out the authenticated captain by clearing their session or token.

---

### **Request Headers**
- `Authorization`: `Bearer <token>` (Required)

---

### **Response Format**

#### **Success Response**
- **Status Code**: `200 OK`
- **Description**: Logout successful.
- **Body**:
```json
{
    "success": true,
    "message": "Logout successful"
}
```

#### **Error Responses**

1. **Unauthorized**
   - **Status Code**: `401 Unauthorized`
   - **Description**: Token is missing or invalid.
   - **Body**:
   ```json
   {
       "success": false,
       "message": "Not authorized

