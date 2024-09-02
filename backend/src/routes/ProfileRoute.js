const express = require('express');
const Profile = require('../controllers/Profile');


const router = express.Router();

router.get('/:id',Profile.Getprofile );
router.post('/', Profile.GetAllProfile);


module.exports = router;
