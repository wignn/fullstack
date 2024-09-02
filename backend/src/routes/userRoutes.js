const express = require('express');
const userController = require('../controllers/userController');


const router = express.Router();

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.get('/email/:email', userController.getUserByEmail);
// router.post('/register', userController.registerUser);




module.exports = router;
