const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now().toString() + "_" + file.originalname);
    }
});

const multerUpload = multer({storage: storage});

module.exports = multerUpload;

// Date.now().toString() + "_" + 