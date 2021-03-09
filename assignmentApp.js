//const { response } = require('express');
const express = require('express');
const fs = require('fs');
const books = require('./booksApi.js');
const cookieParser = require('cookie-parser');
const users = require('./users.ts');
const cors = require('cors');
const jwt = require('jsonwebtoken');
//const bodyParser = require('body-parser');


const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());

app.use(express.json());




//home
app.get("", (req, res) => {
    res.send("Hello World");
});

//add new book
app.post('/books/addBook', users.auth, (req, res) => {

    //console.log(req.body);

    allParamsPresent = req.body.book_id && req.body.book_name && req.body.author_name && req.body.publish_date && req.body.genre;

    if (!(allParamsPresent)) {
        console.log("all parameters not provided");
        return res.send('Please provide  all parameters');
    }


    book = req.body;

    //console.log(req.body);

    books.addBook(book).then(message => { res.send({ message }) });

})



//2. Delete existing book.
app.delete('/books/deleteBook', users.auth, (req, res) => {

    let message = ''

    if (!req.query.book_id) {
        console.log("query parameters not provided");
        message = 'Please provide  query parameters';
        return res.send({ message });
    }



    books.deleteBook(req.query.book_id).then(data => { res.send({ data }) });

})



//3. Update book details.(needs to be done)

app.put('/books/updateBook', users.auth, (req, res) => {

    allParamsPresent = req.body.book_id && req.body.book_name && req.body.author_name && req.body.publish_date && req.body.genre;

    let message = '';
    if (!allParamsPresent) {
        console.log("query parameters not provided");
        message = 'Please provide  query parameters';
        return res.send({ message });
    }


    books.updateBook(req.body).then(message => { res.send({ message }); });




})




//4. Get book details by id
app.get("/books/getBookById", (req, res) => {
    // let message = '';
    // if (!req.query.book_id) {
    //     console.log("query parameters not provided");
    //     message = 'Please provide  query parameters';
    //     return res.send(message);
    // }

    // const book = books.getBookById(req.query.book_id);

    // //console.log(book);

    // if (book !== null)
    //     res.send(book);

    // else {
    //     message = "Book with this id is not available";
    //     res.send(message);
    // }

});


// app.use("/books/getBooks", async (req, res, next) => {
//     try {
//         console.log("Middleware");
//         const token = req.cookies.loginjwt;
//         console.log(token);
//         const verifyUser = jwt.verify(token, "thisismysecretkeytoencryptthistoken");
//         console.log("user Verification :" + verifyUser);


//         const user = await User.findOne({ _id: verifyUser._id });
//         console.log("verified user details :" + user);

//         next();

//     } catch (error) {
//         console.log(error);

//     }

// })



//5. Get all the books details
app.get("/books/getBooks", users.auth, (req, res) => {

    books.getBooks().then(resolve => {
        if (resolve)
            res.send(resolve);
        else
            res.status(401).send(resolve);
    });

});



app.post('/checkUser', (req, res) => {

    //console.log(req.body);

    allParamsPresent = req.body.user_id && req.body.password;

    if (!(allParamsPresent)) {
        console.log("all parameters not provided");
        return res.send('Please provide  all parameters');
    }


    user = req.body;

    //console.log(req.body);

    // users.checkUser(user).then(message => { res.send({ message }) });
    users.checkUser(user).then(message => {
        if (message.token) {
            console.log("login jwt cookie: " + message.token)
            res.cookie('loginjwt', message.token.toString(), { httpOnly: true });
        }

        //console.log(document.cookie);
        res.send({ message: message.info });
    });


})

app.get('/cookie', (req, res, next) => {
    console.log(req.cookies.loginjwt);
    res.send("cookie is set for local host");

});

app.get('/logOut', (req, res, next) => {
    if (req.cookies.loginjwt) {
        res.clearCookie('loginjwt');
        res.send({ message: "Logout" })
    }
    else

        res.send({ message: "Login first in order to logout" });

});


app.post('/registerUser', (req, res) => {
    allParamsPresent = req.body.user_id && req.body.password;

    if (!(allParamsPresent)) {
        console.log("all parameters not provided");
        return res.send('Please provide  all parameters');
    }


    user = req.body;



    users.registerUser(user).then(message => {
        // console.log("// " + message + " //");
        if (message.token) {
            res.cookie('jwt', message.token.toString(), { httpOnly: true });
            res.send({ message: message.info });
            //console.log(cookie)
        }
        console.log(message.info);
        //console.log(document.cookie);
        res.status(401).send({ message: message.info });
    });

})


/*app.get('*', (req, res, next) => {
    console.log("Wildcard");
    res.send({ "page not found"});

});*/


//PORT
//if the path is set in environment take from there otherwise 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Server in on port " + port);
})