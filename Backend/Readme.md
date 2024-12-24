Sure! Here is the complete user API documentation in Markdown format:

```markdown
# User API Documentation

This document outlines the API endpoints for managing user accounts.

## Base URL

All endpoints are relative to the base URL: `/users`

## Authentication

For endpoints requiring authentication (profile and logout), include a Bearer token in the `Authorization` header:  `Authorization: Bearer <token>`

## Endpoints

### 1. Register a New User

**Endpoint:** `/users/register`

**Method:** `POST`

**Request Body:**

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

**Request Headers:**

`Content-Type: application/json`

**Response (201 Created):**

```json
{
  "status": 201,
  "data": {
    "token": "<JWT_TOKEN>",
    "user": {
      "_id": "<user_id>",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
  },
  "message": "User registered successfully"
}
```

**Error Responses:**

- **400 Bad Request:**  Validation errors or missing fields. The response body will contain details of the errors. Example: 
  ```json
  {
    "status": 400,
    "errors": [
      {
        "msg": "Email should be at least 6 characters long",
        "param": "email",
        "location": "body"
      }
    ]
  }
  ```
- **400 Bad Request:** User already exists with this email.

---

### 2. Login

**Endpoint:** `/users/login`

**Method:** `POST`

**Request Body:**

```json
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

**Request Headers:**

`Content-Type: application/json`

**Response (200 OK):**

```json
{
  "status": 200,
  "data": {
    "token": "<JWT_TOKEN>",
    "user": {
      "_id": "<user_id>",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "john.doe@example.com"
    }
  },
  "message": "User logged in"
}
```

**Error Responses:**

- **400 Bad Request:** Validation errors or missing fields.
- **401 Unauthorized:** Invalid email or password.

---

### 3. Get User Profile

**Endpoint:** `/users/profile`

**Method:** `GET`

**Request Headers:**

`Authorization: Bearer <JWT_TOKEN>`

**Response (200 OK):**

```json
{
  "status": 200,
  "data": {
    "_id": "<user_id>",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  },
  "message": "User profile fetched successfully"
}
```

**Error Responses:**

- **401 Unauthorized:** Invalid or missing token.

---

### 4. Logout

**Endpoint:** `/users/logout`

**Method:** `GET`

**Request Headers:**

`Authorization: Bearer <JWT_TOKEN>`

**Response (200 OK):**

```json
{
  "status": 200,
  "data": {},
  "message": "User logged out"
}
```

**Error Responses:**

- **401 Unauthorized:** Invalid or missing token.

---

## Error Handling

All API responses follow a consistent structure:

```json
{
  "status": <HTTP_STATUS_CODE>,
  "data": <DATA_OBJECT>,
  "message": <MESSAGE_STRING>
}
```

Error responses will include an appropriate HTTP status code and a descriptive message. Validation errors will include details about the specific errors.

---

## Notes

- Passwords are hashed and never transmitted in the response.
- Token expiration is set to 24 hours.

---

This documentation provides a comprehensive overview of the user API endpoints. Remember to replace placeholders like `<JWT_TOKEN>` and `<user_id>` with actual values.
```


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

