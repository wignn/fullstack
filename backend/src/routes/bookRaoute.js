const express = require('express');
const BookC = require('../controllers/Book');



const router = express.Router();


router.get('/', BookC.getAllBooks);
router.post('/', BookC.createBook);
router.get('/:title', BookC.getBookByName);


module.exports = router;
