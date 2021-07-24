const express = require('express');
const multerUpload = require('../../middlewares/multer');

const router = express.Router({ mergeParams: true });


const productControllers = require('../../controllers/menu/productControllers');


router.post('/', multerUpload.single('image'),  productControllers.createProduct);

router.get('/', productControllers.getProducts);

router.get('/:id', productControllers.getProduct);

router.patch('/:id', multerUpload.single('image'), productControllers.updateProduct);

router.delete('/:id', productControllers.deleteProduct);




module.exports = router;