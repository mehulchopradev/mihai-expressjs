const express = require('express');
const BookNotFoundError = require('./common/exceptions/book_not_found');
const libraryRouter = require('./library/routes');
const musicRouter = require('./songs/routes');
const app = express(); // express application object

const PORT_NO = 9002;

app.use('/library', libraryRouter); // libraryRouter (Router) -> middleware
app.use('/music', musicRouter);
// app.use(express.json());

// registering an app wide error middleware
// callback should have four arguments
app.use((err, req, res, next) => {
    console.log(err);
    if (err instanceof BookNotFoundError) {
        res.status(404).send({
            error: err.message
        });
    }
});

// GET -> /hello
app.get('/hello', (req, res) => {
    res.send('Hello World');
});



app.listen(PORT_NO, () => {
    console.log(`Server running on port no ${PORT_NO}`);
});