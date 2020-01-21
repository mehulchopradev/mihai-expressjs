const express = require('express');
const libraryRouter = require('./library/routes');
const musicRouter = require('./songs/routes');
const app = express(); // express application object

const PORT_NO = 9002;

app.use('/library', libraryRouter); // libraryRouter (Router) -> middleware
app.use('/music', musicRouter);
// app.use(express.json());

// GET -> /hello
app.get('/hello', (req, res) => {
    res.send('Hello World');
});



app.listen(PORT_NO, () => {
    console.log(`Server running on port no ${PORT_NO}`);
});