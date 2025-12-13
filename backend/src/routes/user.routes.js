const express = require('express');
const router = express.Router();

// configs
const upload = require('../config/multer');
// Controllers
const {ProfileHandler,ProfileEditHandler, ProfileSecurityHandler, ContactUsHandler}=require("../controllers/user.controllers")



router.get('/profile',ProfileHandler);
router.post('/profile/edit/:id', upload.single('profilePic'),ProfileEditHandler);
router.post('/profile/security/:id',ProfileSecurityHandler )
router.post('/contactus',ContactUsHandler);



module.exports = router;