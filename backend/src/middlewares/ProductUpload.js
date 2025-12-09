const upload = require("../config/multer");

const productUploadMiddleware = upload.fields([
    { name: 'thumbnail', maxCount: 1 }, 
    { name: 'photos', maxCount: 10 }
])
module.exports=productUploadMiddleware