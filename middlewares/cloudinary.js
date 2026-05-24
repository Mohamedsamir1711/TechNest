const cloudinary = require('../config/cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const streamifier = require('streamifier');


const UploadToCloudinary = (buffer) => {
    return new Promise((res, rej) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder: 'products',
            },
            (err, data) => {
                if (err) rej(err);
                else res(data);
            }
        );
        streamifier.createReadStream(buffer).pipe(uploadStream);
    });

}

module.exports = UploadToCloudinary;