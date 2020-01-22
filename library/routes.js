// exclusively we are going to define routes specific to only the library module
const express = require('express');
const fs = require('fs');
// const { findBookById, filterBooksBy, createBook, updateBook } = require('./service/books');
const booksService = require('./service/books');
const BookNotFoundError = require('../common/exceptions/book_not_found');
const { logEvent } = require('./middlewares/logging');
const { bookByTitle } = require('./middlewares/book_existence');

const router = express.Router();

router.use(express.json()); // to parse json data in the request
router.use(logEvent); // mounts our custom middleware for every route in the router object

router.get('/books/:bookId', (req, res) => {

    const bookId = parseInt(req.params.bookId);

    const bookFound = booksService.findBookById(bookId);
    if (bookFound) {
        res.send(bookFound); // 200
    } else {
        /* res.status(404).send({
            error: 'Book not found'
        }); */
        // this is only when error happens in a synchronous code
        throw new BookNotFoundError('Book not found');
    }
});


router.get('/books', (req, res) => {

    // res.set('Content-Type', 'text/plain'); // useful for sending own custom or overridable headers
    // you set the header before sending in the response
    const query = req.query;
    
    /* const keys = Object.keys(query);
    let booksFiltered = books;
    for (key of keys) {
        booksFiltered = booksFiltered.filter(book => book[key] === query[key])
    } */

    if (query.title) {
        const title = query.title;
        
        const booksFound = booksService.filterBooksBy(book => book.title === title);
        res.send(booksFound);
    } else {
        res.send(booksService.getBooks());
    };
});

router.post('/books', [bookByTitle], (req, res) => {

    const newBook = req.body;
    const bookCreated = booksService.createBook(newBook);
    
    res.status(201).send(bookCreated);
});

router.put('/books/:bookId', (req, res) => {
    const bookId = parseInt(req.params.bookId);
    const book = req.body;

    const bookUpdated = booksService.updateBook(bookId, book);

    if (bookUpdated) {
        res.send(bookUpdated); // 200
    } else {
        /* res.status(404).send({
            error: 'Book not found'
        }); */
        throw new BookNotFoundError('Book not found');
    }
});

router.get('/download', (req, res) => {
    // const path = '/Users/mehulc/Downloads/Docker.dmg';
    // res.download(path);
    const path = '/Users/mehulc/Downloads/Docker.dmg';
    const fsStream = fs.createReadStream(path);
    res.attachment('Docker-copy.dmg');
    fsStream.pipe(res);
});


module.exports = router;