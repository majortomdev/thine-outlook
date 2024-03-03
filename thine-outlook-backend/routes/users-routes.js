const express = require('express');
const { check } = require('express-validator');

const usersController = require('../controllers/users-controller');

const router = express.Router();



router.get('/', usersController.getAllUsers);

router.post('/signup', [
    check('email').normalizeEmail().isEmail(),
    check('userName').not().isEmpty(),
    check('password').isLength({min: 5})
], 
usersController.newUserSignUp);

router.post('/login', usersController.login);

module.exports = router;