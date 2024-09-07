const express = require('express');
const userController = require('../controllers/userController');


const router = express.Router();

router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.get('/email/:email', userController.getUserByEmail);
router.get('/name/:name', userController.GetusersName);
router.post('/register', userController.registerUser);
router.post('/updateStatus', userController.updateStatus);




module.exports = router;
