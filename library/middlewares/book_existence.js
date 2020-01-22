const bookService = require('../service/books');

exports.bookByTitle = function (req, res, next) {
    const newBook = req.body;
    const booksFound = bookService.filterBooksBy(book => book.title === newBook.title);
    if (booksFound.length) {
        res.sendStatus(400);
    } else {
        next();
    }
};