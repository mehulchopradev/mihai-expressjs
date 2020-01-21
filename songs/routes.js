// exclusively we are going to define routes specific to only the songs module
const express = require('express');

const router = express.Router();

router.get('/songs', (req, res) => {
    res.send('List of songs');
});

module.exports = router;