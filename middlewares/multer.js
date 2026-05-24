const multer = require('multer');
const AppError = require('../utils/AppError');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/public/');
    },
    filename: (req, file, cb) => {
        cb(null, `user-${Date.now()}-${file.originalname}`);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new AppError('Not an image!', 400), null);
    }
};

const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 2   
    }
});

module.exports = upload;