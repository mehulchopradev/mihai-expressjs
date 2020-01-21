// exclusively we are going to define routes specific to only the library module
const express = require('express');

const router = express.Router();

let i = 3;
const books = [
    {
        id: 1,
        title: 'Book 1',
        pages: 1900,
        price: 900,
    },
    {
        id: 2,
        title: 'Book 2',
        pages: 890,
        price: 230,
    },
    {
        id: 3,
        title: 'Book 3',
        pages: 789,
        price: 800,
    }
];

router.use(express.json()); // to parse json data in the request

router.get('/books/:bookId', (req, res) => {
    const bookId = parseInt(req.params.bookId);

    const bookFound = books.find(book => book.id === bookId);
    if (bookFound) {
        res.send(bookFound); // 200
    } else {
        res.sendStatus(404);
    }
});


router.get('/books', (req, res) => {
    // res.set('Content-Type', 'text/plain'); // useful for sending own custom or overridable headers
    // you set the header before sending in the response
    const query = req.query;
    const keys = Object.keys(query);
    let booksFiltered = books;
    for (key of keys) {
        booksFiltered = booksFiltered.filter(book => book[key] === query[key])
    }

    if (query.title) {
        const title = query.title;
        
        const booksFound = books.filter(bookFilter);
        res.send(booksFound);
    } else {
        res.send(books)
    };
});

router.post('/books', (req, res) => {
    const newBook = req.body;
    newBook.id = ++i;
    books.push(newBook);
    
    res.status(201).send(newBook);
});

router.put('/books/:bookId', (req, res) => {
    const bookId = parseInt(req.params.bookId);
    const book = req.body;

    const bookFound = books.find(book => book.id === bookId);
    if (bookFound) {
        bookFound.title = book.title;
        bookFound.price = book.price;
        bookFound.pages = book.pages;

        res.send(bookFound); // 200
    } else {
        res.sendStatus(404);
    }
});


module.exports = router;