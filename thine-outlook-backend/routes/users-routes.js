const express = require('express');
const { check } = require('express-validator');

const usersController = require('../controllers/users-controller');
const fileUpload = require('../middleware/file-upload');

const router = express.Router();



router.get('/', usersController.getAllUsers);

router.post('/signup',
    fileUpload.single('image'),
    [
    check('email').normalizeEmail().isEmail(),
    //check('userName').not().isEmpty(),
    check('name').not().isEmpty(),
    check('password').isLength({min: 6})
], 
usersController.newUserSignUp);

router.post('/login', usersController.login);

module.exports = router;