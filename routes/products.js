const express = require('express');
const router = express.Router();
const product = require('../controller/products');
const addProduct = require('../validations/addProducts')
const validator = require('../middlewares/validator')
const upload = require('../middlewares/multer');
const UploadToCloudinary = require('../middlewares/cloudinary');
router.get('/', product.getAllProducts);
router.post('/', validator(addProduct), product.addProduct);
router.get('/status', product.getStatus);
router.get('/deleted', product.getDeletedProducts);
router.get('/:id', product.getOneProduct);
router.put('/:id', product.editProduct);
router.delete('/:id', product.deleteProduct);
router.patch('/soft-delete/:id', product.softDeleteProduct);

router.route('/upload').post(upload.single('product'), async (req, res, next) => {
    const result = await UploadToCloudinary(req.file.buffer);
    res.status(200).json({
        success: true,
        message: 'Image uploaded successfully',
        url: result.secure_url,
    });
})

module.exports = router;