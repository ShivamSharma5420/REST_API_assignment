const fs = require("fs");



const loadBooks = () => {
    try {
        const dataBuffer = fs.readFileSync('books.json');
        const dataJson = dataBuffer.toString();
        return JSON.parse(dataJson);
    } catch (e) {
        return [];
    }
}


const addBook = (bookinfo) => {
    const books = loadBooks();

    const duplicate = books.filter((book) => {
        return book.book_id === bookinfo.book_id;
    })

    if (duplicate.length === 0) {
        books.push(bookinfo);

        savebooks(books);
        console.log("new book added");
    }
    else {
        console.log("Book with this book_id is already added");
    }

}

const listBooks = () => {
    const books = loadBooks();
    books.forEach(book => {
        console.log(book.book_id, book.book_name);

    });
    return books;
}

const listBookById = (book_id) => {
    const books = loadBooks();
    let ifpresent = null;
    books.forEach(book => {

        if (book.book_id == book_id) {
            console.log(book.book_id, book.book_name);
            ifpresent = book;

        }

    }
    );
    if (ifpresent) {
        //console.log("Book with this id is  present");
        return ifpresent;
    }
    else {
        console.log("Book with this id is not present");
        return null;
    }

}

const deleteBook = (book_id) => {
    const books = loadBooks();

    const otherthanTitle = books.filter((book) => {
        return book.book_id !== book_id;
    });

    if (otherthanTitle.length === books.length) {
        console.log("No book found with this title");
    }
    else {
        console.log("book deleted");
    }

    savebooks(otherthanTitle);

}

const updateBook = (bookinfo) => {
    const books = loadBooks();

    const otherthanTitle = books.filter((book) => {
        return book.book_id !== bookinfo.book_id;
    });

    /* if (otherthanTitle.length === books.length) {
         console.log("No book found with this title");
     }
     else {
         otherthanTitle.push(bookinfo);
         console.log("book updated");
     }*/
    otherthanTitle.push(bookinfo);
    console.log("book updated");

    savebooks(otherthanTitle);

}





const savebooks = (books) => {
    dataJson = JSON.stringify(books);
    fs.writeFileSync('books.json', dataJson);
}


// getBooks: getBooks,
// removeBook: removeBook,


module.exports = {
    addBook: addBook,
    listBooks: listBooks,
    loadBooks: loadBooks,
    updateBook: updateBook,
    deleteBook: deleteBook,
    listBookById: listBookById,

}