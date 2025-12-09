const multer = require('multer');

// Use memory storage to get the file buffer in req.file.buffer
const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = upload;