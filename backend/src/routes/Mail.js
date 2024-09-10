const express = require('express');
const Mail = require('../services/Mail');

const router = express.Router();
router.post('/',Mail.sendEmail);


module.exports = router;
