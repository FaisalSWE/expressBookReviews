const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
  return username && !users.some(user => user.username === username);
};

const authenticatedUser = (username, password) => {
  return users.some(user => user.username === username && user.password === password);
};

// Only registered users can login
regd_users.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }
  if (authenticatedUser(username, password)) {
    const accessToken = jwt.sign({ username }, 'your_secret_key', { expiresIn: '1h' });
    req.session.authorization = { accessToken };
    return res.status(200).json({ message: "Login successful", accessToken });
  } else {
    return res.status(401).json({ message: "Invalid username or password" });
  }
});

// Add or modify a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = parseInt(req.params.isbn);
  const { review } = req.body;
  const username = req.user.username;

  if (!isbn || !review) {
    return res.status(400).json({ message: "ISBN and review are required" });
  }
  if (books[isbn]) {
    books[isbn].reviews[username] = review; // Store review under user's username
    return res.status(200).json({ message: "Review added/modified successfully", reviews: books[isbn].reviews });
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = parseInt(req.params.isbn);
  const username = req.user.username;

  if (!isbn) {
    return res.status(400).json({ message: "ISBN is required" });
  }
  if (books[isbn] && books[isbn].reviews[username]) {
    delete books[isbn].reviews[username]; // Delete only the user's review
    return res.status(200).json({ message: "Review deleted successfully", reviews: books[isbn].reviews });
  } else {
    return res.status(404).json({ message: "Review not found or you don't have permission" });
  }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;