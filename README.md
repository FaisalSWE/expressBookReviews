# Online Book Review Application

This is the final project for [Developing Back-End Apps with Node.js and Express by IBM], developed using Node.js and Express.js. The application serves as a back-end RESTful web service for an online book retailer, allowing users to manage book ratings and reviews.

## Project Overview
- **Purpose**: Provides a server-side API to store, retrieve, and manage book data and user reviews.
- **Features**:
  - Retrieve a list of all books.
  - Search books by ISBN, author, or title.
  - Register and login users.
  - Add, modify, and delete book reviews (for logged-in users).
  - Support multiple simultaneous users with Async/Await and Promises.
- **Technologies**: Node.js, Express.js, JSON Web Tokens (JWT), Express Session.

## Setup Instructions
1. Clone the repository: `git clone https://github.com/FaisalSWE/expressBookReviews`
2. Navigate to the project folder: `cd final_project`
3. Install dependencies: `npm install`
4. Start the server: `node index.js`
5. Test APIs using Postman at `http://localhost:5000`.

API Endpoints
- GET http://localhost:5000/ - Get all books
- GET http://localhost:5000/isbn/:isbn - Get book by ISBN
- GET http://localhost:5000/author/:author - Get books by author
- GET http://localhost:5000/title/:title - Get books by title
- GET http://localhost:5000/review/:isbn - Get book reviews
- POST http://localhost:5000/register - Register a new user
- POST http://localhost:5000/customer/login - Login user
- PUT http://localhost:5000/customer/auth/review/:isbn - Add/modify review
- DELETE http://localhost:5000/customer/auth/review/:isbn - Delete review
## Author
[FaisalSWE]
