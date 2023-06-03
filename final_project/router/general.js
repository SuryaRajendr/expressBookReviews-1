const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(300).json({message:JSON.stringify(books)});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn
  let resultData = [];
  console.log(books)
  for (let key in books) {  
      console.log(books[key])
        if(key === isbn)
        {
            resultData.push(books[key])
        }
  }
  return res.status(300).json({message: resultData});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author
  let resultData = [];
  for (let key in books) {
        console.log("books[key]",books[key])
      for (let book in books[key]) {
        console.log(book, books[key][book]);
        if( books[key][book] === author) {
            resultData.push(books[key])
        }}}
  return res.status(300).json({message: resultData});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const fullTitle = req.params.title
  const title = fullTitle.replace("+", " ")
  console.log(title)
  let resultData = [];
  for (let key in books) {
      for (let book in books[key]) {
        console.log(book, books[key][book]);
        if( books[key][book] === title) {
            resultData.push(books[key])
        }}}
  return res.status(300).json({message: resultData});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
