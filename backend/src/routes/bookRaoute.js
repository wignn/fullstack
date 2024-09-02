const express = require('express');
const BookC = require('../controllers/Book');



const router = express.Router();

// Should be placed before dynamic routes
router.get('/', BookC.getAllBooks)
router.get('/:title', BookC.getBookByName); // More specific for title-based search
router.get('/:query', BookC.getBook);
router.delete('/:id', BookC.deleteBook);

module.exports = router;
