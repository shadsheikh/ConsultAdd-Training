const express = require("express")
const router = express.Router();
const userController = require('../controllers/userControllers')

router
    .route('/')
    .get(userController.getAllUsers)
    .post(userController.formValidation, userController.createUser)

router
    .route('/:id')
    .get(userController.getUser)
    .put(userController.updateUser)
    .delete(userController.deleteUser)

module.exports = router