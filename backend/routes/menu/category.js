const express = require('express');
const multerUpload = require('../../middlewares/multer');

const router = express.Router({ mergeParams: true });

const subCategoryRoute = require('./subCategory');
router.use('/:categoryId/sub-categories', subCategoryRoute);


const categoryControllers = require('../../controllers/menu/categoryControllers');

router.post('/', multerUpload.single('image'), categoryControllers.createCategory);

router.get('/', categoryControllers.getCategories);

router.get('/:id', categoryControllers.getCategory);

router.patch('/:id', multerUpload.single('image'), categoryControllers.updateCategory);

router.delete('/:id', categoryControllers.deleteCategory);




module.exports = router;