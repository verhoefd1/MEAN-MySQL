const
    express = require('express'),
    session = require('express-session'),
    MySQLStore = require('express-mysql-session')(session),
    { db } = require('../../utils'),
    { createUUID, validatePasswordMiddleware, hashPasswordMiddleware } = require('./auth.middleware'),
    AuthController = require('./auth.controller'),
    router = express.Router();

// Render registration form
router.get('/register', AuthController.renderRegistration);

// Render Login Form
router.get('/login', AuthController.renderLogin);

//Create user account
router.post('/register', validatePasswordMiddleware, hashPasswordMiddleware, createUUID, AuthController.createUser);

//Login user account
router.post('/login', AuthController.loginUser)

module.exports = router;