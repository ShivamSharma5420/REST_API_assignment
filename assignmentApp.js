const { response } = require('express');
const express = require('express');
const fs = require('fs');
const books = require('./books.js');
const cors = require('cors');
//const bodyParser = require('body-parser');


const app = express();

app.use(cors());

app.use(express.json());




//home
app.get("", (req, res) => {
    res.send("Hello World");
});









//1. Add a new book.

/*
app.get('/books/addBook', (req, res) => {

    allParamPresent = req.query.book_id && req.query.book_name && req.query.author_name && req.query.publish_date && req.query.genre;

    if (!(allParamPresent)) {
        console.log("query parameters not provided");
        return res.send('Please provide  query parameters');
    }


    book = req.query;

    console.log(req.query);

    books.addBook(book);

    res.send("Book added");


})*/


app.post('/books/addBook', (req, res) => {

    //console.log(req.body);

    allParamsPresent = req.body.book_id && req.body.book_name && req.body.author_name && req.body.publish_date && req.body.genre;

    if (!(allParamsPresent)) {
        console.log("all parameters not provided");
        return res.send('Please provide  all parameters');
    }


    book = req.body;

    console.log(req.body);

    books.addBook(book);
    console.log("book");

    //res.send("Book added");
    res.end();

})



//2. Delete existing book.
/*
app.get('/books/deleteBook', (req, res) => {



    if (!req.query.book_id) {
        console.log("query parameters not provided");
        return res.send('Please provide  query parameters');
    }


    books.deleteBook(req.query.book_id);

    res.send("Book deleted");


})*/


app.delete('/books/deleteBook', (req, res) => {

    let message = ''

    if (!req.query.book_id) {
        console.log("query parameters not provided");
        message = 'Please provide  query parameters';
        return res.send({ message });
    }


    books.deleteBook(req.query.book_id);

    message = "Book deleted"

    res.send({ message });


})



//3. Update book details.(needs to be done)

app.put('/books/updateBook', (req, res) => {

    allParamsPresent = req.body.book_id && req.body.book_name && req.body.author_name && req.body.publish_date && req.body.genre;

    let message = '';
    if (!allParamsPresent) {
        console.log("query parameters not provided");
        message = 'Please provide  query parameters';
        return res.send({ message });
    }


    books.updateBook(req.body);

    message = "Book updated";

    res.send({ message });


})




//4. Get book details by id
app.get("/books/getBookById", (req, res) => {
    let message = '';
    if (!req.query.book_id) {
        console.log("query parameters not provided");
        message = 'Please provide  query parameters';
        return res.send(message);
    }

    const book = books.listBookById(req.query.book_id);

    console.log(book);

    if (book !== null)
        res.send(book);

    else {
        message = "Book with this id is not available";
        res.send(message);
    }

});


//5. Get all the books details
app.get("/books/getBooks", (req, res) => {

    const Allbooks = books.listBooks();

    console.log("sending...");
    res.send(Allbooks);
});



//PORT
//if the path is set in environment take from there otherwise 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Server in on port " + port);
})