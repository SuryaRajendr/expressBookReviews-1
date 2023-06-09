const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  return res.status(300).json({books:books});
});
//
public_users.get('/',function (req, res) {
  //Write your code here
  let myPromise1 = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve(JSON.stringify(books))
    },6000)})
    myPromise1.then((successMessage) => {
     // console.log("From Callback " + successMessage)
      return res.status(300).json({message:successMessage});
    })
 
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

public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author
  console.log("author",author)
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
  const title = req.params.title
  //const title = fullTitle.replace("+", " ")
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
  const isbn = req.params.isbn
  let resultData = [];
  for (let key in books) {
    if(key === isbn)
    {
      console.log(books[key].reviews)
        resultData.push(books[key].reviews)
    }
     }
  return res.status(300).json({message: resultData});
});

module.exports.general = public_users;
