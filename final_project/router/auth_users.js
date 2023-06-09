const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [{
  "username":"test",
  "password":"1234"
},
{
  "username":"surya",
  "password":"1234"
}];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
let userswithsamename = users.filter((user)=>{
  return user.username === username
});
if(userswithsamename.length > 0){
  return true;
} else {
  return false;
}

}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
let validusers = users.filter((user)=>{
  return (user.username === username && user.password === password)
});
if(validusers.length > 0){
  return true;
} else {
  return false;
}
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
      return res.status(404).json({message: "Error logging in"});
  }
  if (authenticatedUser(username,password)) {
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 60 * 60 *60});
    console.log("accessToken======>",accessToken)
    req.session.authorization = {
      accessToken,username
  }
  console.log("req.session.authorization",req.session.authorization)
  return res.status(200).send("User successfully logged in");
  } else {
    return res.status(208).json({message: "Invalid Login. Check username and password"});
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  console.log("inside",req.user)
  const { accessToken,username } = req.session.authorization 
  console.log("accessToken,username ", accessToken,username )
  //Write your code here
   const isbn  = req.params.isbn;
   const review = req.query.review;
   console.log(isbn, review)
            for (let key in books) {  
              //console.log(books[key])
                if(key === isbn)
                {
                  console.log("before change ===============> books[key]",books[key])
                  console.log("books[key].review",books[key].reviews[username])
                  //console.log(books[key].review.hasOwnProperty(username))
                    //if(books[key].reviews.hasOwnProperty(username))
                    if(books[key].reviews[username] || books[key].reviews.hasOwnProperty(username))
                    {
                        // Modify the existing review for the user
                        books[key].reviews[username] = review;
                        console.log("After change ===============> books[key]",books[key])
                        return res.send('Review modified successfully');
                    }   
                    else 
                    {
                      // Add a new review for the user under the same ISBN
                      books[key].reviews[username] = review; 
                      console.log("After change ===============> books[key]",books[key])
                      return res.send('Review added successfully');
                    } 
                }
              }  
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
  console.log("inside",req.user)
  const { accessToken,username } = req.session.authorization 
  console.log("accessToken,username ", accessToken,username )
  //Write your code here
   const isbn  = req.params.isbn;
   const review = req.query.review;
   console.log(isbn, review)
            for (let key in books) {  
                if(key === isbn)
                {     
                  if( books[key].reviews.hasOwnProperty(username))
                  {     
                        console.log("books[key].reviews",books[key].reviews)  // before delete 
                        // Modify the existing review for the user
                        delete books[key].reviews[username];
                        console.log("books[key].reviews",books[key].reviews)  // after delete
                        return res.send('Review deleted successfully'); 
                  }
                }
              }

})

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
