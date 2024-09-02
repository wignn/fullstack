const express = require('express');
const Msg = require('../controllers/Msg');



const router = express.Router();

router.get('/', Msg.GetAllMsg)
router.post('/Post', Msg.CreateMsg)

module.exports = router;
