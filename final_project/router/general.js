const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Simulate async operation
const getBooksAsync = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(books), 100);
  });
};

// Task 10: Get all books – Using async callback function
public_users.get('/', async function (req, res) {
  try {
    const bookList = await getBooksAsync();
    return res.status(200).json(bookList);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching books" });
  }
});

// Task 11: Search by ISBN – Using Promises
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = parseInt(req.params.isbn);
  getBooksAsync().then((bookList) => {
    const book = bookList[isbn];
    if (book) {
      return res.status(200).json(book);
    } else {
      return res.status(404).json({ message: "Book not found" });
    }
  }).catch((error) => {
    return res.status(500).json({ message: "Error fetching book" });
  });
});

// Task 12: Search by Author
public_users.get('/author/:author', async function (req, res) {
  try {
    const bookList = await getBooksAsync();
    const author = req.params.author;
    const authorBooks = Object.values(bookList).filter(book => book.author.toLowerCase() === author.toLowerCase());
    if (authorBooks.length > 0) {
      return res.status(200).json(authorBooks);
    } else {
      return res.status(404).json({ message: "No books found by this author" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error fetching books" });
  }
});

// Task 13: Search by Title
public_users.get('/title/:title', async function (req, res) {
  try {
    const bookList = await getBooksAsync();
    const title = req.params.title;
    const titleBooks = Object.values(bookList).filter(book => book.title.toLowerCase().includes(title.toLowerCase()));
    if (titleBooks.length > 0) {
      return res.status(200).json(titleBooks);
    } else {
      return res.status(404).json({ message: "No books found with this title" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error fetching books" });
  }
});

// Get book review (unchanged for now)
public_users.get('/review/:isbn', function (req, res) {
  const isbn = parseInt(req.params.isbn);
  const book = books[isbn];
  if (book && Object.keys(book.reviews).length > 0) {
    return res.status(200).json(book.reviews);
  } else {
    return res.status(404).json({ message: "No reviews found for this book" });
  }
});

// Register a new user (unchanged)
public_users.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }
  if (isValid(username)) {
    users.push({ username, password });
    return res.status(201).json({ message: "User registered successfully" });
  } else {
    return res.status(400).json({ message: "Username already exists or is invalid" });
  }
});

module.exports.general = public_users;