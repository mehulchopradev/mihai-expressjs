// suppose to define and export all business functions related to books
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

exports.findBookById = function (bookId) {
    return books.find(book => book.id === bookId);
}

exports.filterBooksBy = function (filterFunc) {
    return books.filter(filterFunc);
}

exports.getBooks = function () {
    return books;
}

exports.createBook = function (newBook) {
    // const cloneBook = Object.assign({}, newBook); // shallow copy
    const cloneBook = JSON.parse(JSON.stringify(newBook)); // deep copy
    cloneBook.id = ++i;
    books.push(cloneBook);
    return cloneBook;
}

exports.updateBook = function (bookId, bookToUpdate) {
    const bookFound = this.findBookById(bookId);
    if (bookFound) {
        bookFound.title = bookToUpdate.title;
        bookFound.price = bookToUpdate.price;
        bookFound.pages = bookToUpdate.pages;

        return bookFound
    }

    return null;
}