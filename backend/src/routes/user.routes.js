const express = require('express');
const router = express.Router();

// configs
const upload = require('../config/multer');
// Controllers
const { ProfileHandler, ProfileEditHandler, ProfileSecurityHandler, ContactUsHandler } = require("../controllers/user.controllers");
const { UserCanAcces } = require('../middlewares/AuthenticationMiddleware');

router.get('/profile', UserCanAcces, ProfileHandler);
router.post('/profile/edit/:id', UserCanAcces, upload.single('profilePic'), ProfileEditHandler);
router.post('/profile/security/:id', UserCanAcces, ProfileSecurityHandler)
router.post('/contactus', ContactUsHandler);



module.exports = router;