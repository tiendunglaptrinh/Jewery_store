const express = require("express");
const router = express.Router();
const userController = require('../controller/UserController');
const { authMiddleware, authUserMiddleware } = require("../midleware/authMiddleware");

router.post('/sign-up', userController.createUser)
router.post('/sign-in', userController.loginUser)
router.put('/update-user/:id', userController.updateUser)
router.delete('/delete-user/:id', authMiddleware , userController.deleteUser)
router.get('/getAll', authMiddleware , userController.getAllUser)
router.get('/get-detail/:id', authUserMiddleware, userController.getDetailUser)
router.get('/logout', userController.logoutUser)
router.get('/check-loggedin', userController.checkLogged);


module.exports = router;