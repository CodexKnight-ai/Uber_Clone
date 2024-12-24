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