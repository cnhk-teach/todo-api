# ToDo API Node.js

This is a RESTful API built with Node.js and Express for managing ToDo items.

## Features

- Create, read, update, and delete ToDo items
- CRUD operations for ToDo lists
- User authentication with JWT (JSON Web Tokens)

## Installation

1. Clone the repository:

    ```
    git clone https://github.com/cnhk-teach/todo-api.git
    ```

2. Navigate to the project directory:

    ```
    cd todo-api
    ```

3. Install dependencies:

    ```
    npm install
    ```

4. Set up environment variables:

    Create a `.env` file in the root directory and add the following variables:

    ```
    PORT=3000
    MONGODB_URI=mongodb://localhost:27017/todo
    JWT_SECRET=yoursecretkey
    ```

    Modify `PORT`, `MONGODB_URI`, and `JWT_SECRET` according to your requirements.

5. Start the server:

    ```
    npm start
    ```
    To start in dev mode, use `npm run dev` command

The server will start on the specified port (default is 3000). You can now access the API at `http://localhost:3000`.

## API Documentation

### Authentication

- **POST /signup**: Signup a new user.
- **POST /login**: Log in with existing credentials to obtain a JWT token for authentication.

### ToDo Items

- **GET /todo/view**: Get all ToDo items.
- **POST /todo/add**: Create a new ToDo item.
- **PATCH /todo/completed/:id**: Mark a ToDo item as completed by ID.
- **DELETE /todo/delete/:id**: Delete a ToDo item by ID.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT) for authentication
- Bcrypt

## Contributing

Contributions are welcome! Feel free to fork the repository and submit pull requests.
