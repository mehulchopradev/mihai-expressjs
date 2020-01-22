class BookNotFoundError extends Error {
    constructor(message) {
        super(message);
    }
}

module.exports = BookNotFoundError;