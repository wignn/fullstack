const express = require('express');
const BookC = require('../controllers/Book');
const { book } = require('../config/db');



const router = express.Router();
router.get('/:bookId',BookC.getBook);
router.get('/:bookId/chapters', BookC.getChapter)
router.get('/',BookC.getAllBooks)
router.post('/create',BookC.bookCreate)
router.put('/update', BookC.bookUpdate)
router.delete('/delete', BookC.deleteUpdate)


module.exports = router;
