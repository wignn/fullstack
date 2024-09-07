const express = require('express');
const BookC = require('../controllers/Book');



const router = express.Router();
router.get('/:bookId',BookC.getBook);
router.get('/:bookId/chapters', BookC.getChapter)
router.get('/',BookC.getAllBooks)


module.exports = router;
