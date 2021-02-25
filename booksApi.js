const fs = require("fs");

const mongoose = require('mongoose');

//connection creation and creating a new DB
mongoose.connect("mongodb://localhost:27017/bookStore", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("mongoDB connected"))
    .catch((err) => console.log(err))



//schema
//A Mongoose Schema defines the structure of the document, default values, validations, etc.

const bookSchema = new mongoose.Schema({
    book_id: { type: Number, required: true, min: 0 },

    book_name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minlength: [3, "Length should be 3 or greater"],
        maxlength: 10,
        validate(value) {
            if (value === 'book')
                throw new Error("'book' cannot be a name of a book")
        }


    },

    author_name: String,

    publish_date: { type: Date, default: Date.now },

    genre: {
        type: String,
        required: true,
        lowercase: true,
        enum: ["drama", "thrill", "suspense", "action", "comedy", "fiction"]
    }
});

//Collection creation
const Book = new mongoose.model('Book', bookSchema);

//create (adding a new book)
const addBook = async (bookinfo) => {
    let message = "book added";
    try {

        const firstBook = new Book(bookinfo);

        const result = await firstBook.save();
        console.log(result);
        return message;
    } catch (err) {

        console.log("error: " + err._message);
        message = "error: " + err._message
        return message;
    }

}



//read (reading all books present)
const getBooks = async () => {
    try {
        const books = await Book.find({});

        books.forEach(book => {
            console.log(book.book_id, book.book_name);
        });
        return books;

    } catch (err) {
        console.log("error");
    }
}


//update (update book details)
const updateBook = async (bookinfo) => {

    let message = "";
    try {
        const result = await Book.updateOne({ book_id: bookinfo.book_id }, { $set: bookinfo }, { runValidators: true })
        console.log(result);
        if (result.nModified === 0) {

            message = "book is not there to update, Adding new... : ";
            console.log(message);
            await addBook(bookinfo).then((addmessage) => { message += addmessage; });
            return message;
        }
        else {
            message = "Book updated";
            return message;
        }
    } catch (err) {
        console.log("err");
        return "error :" + err._message;

    }

}

//delete (delete book by id)

const deleteBook = async (id) => {

    try {
        const result = await Book.deleteOne({ book_id: id })
        console.log(result);
        if (result.deletedCount === 0) {
            console.log("book is not there to delete");
            return "book is not there to delete";
        }
        else
            return "book deleted";

    } catch (err) {
        console.log(err);
    }

}



const getBookById = (book_id) => {


}




module.exports = {
    addBook: addBook,
    getBooks: getBooks,
    updateBook: updateBook,
    deleteBook: deleteBook,
    getBookById: getBookById,

}