const express = require('express');
const router = express.Router();
// Validators 
const { RegisterValidator,validate,LoginValidator}=require('../utils/express-validator')

// Controllers
const {LoginHandler,LogoutHandler,RegisterHandler}=require('../controllers/auth.controllers')
// Middlewares
const {UserCanAuthenticate}=require('../middlewares/AuthenticationMiddleware')

// register
router.post('/register',UserCanAuthenticate,RegisterValidator,validate,RegisterHandler)

// login
router.post('/login',UserCanAuthenticate,LoginValidator,validate,LoginHandler)

// log out 
router.get('/logout',LogoutHandler)

module.exports = router;