const express = require('express');
const router = express.Router();
// Validators 
const { RegisterValidator,validate,LoginValidator}=require('../utils/express-validator')

// Controllers
const {LoginHandler,LogoutHandler,RegisterHandler}=require('../controllers/auth.controllers')
// Middlewares
const {UserCanAuthenticate}=require('../middlewares/AuthenticationMiddleware')

// User Auth Routes
router.post('/register',UserCanAuthenticate,RegisterValidator,validate,RegisterHandler)
router.post('/login',UserCanAuthenticate,LoginValidator,validate,LoginHandler) 
router.get('/logout',LogoutHandler)
// Admin Auth Routes Will Come here


module.exports = router;