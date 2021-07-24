const express = require('express');
const router = express.Router({ mergeParams: true });

const productRoute = require('./product');
router.use('/:subCategoryId/products', productRoute);

const subCategoryControllers = require('../../controllers/menu/subCategoryControllers');

router.post('/', subCategoryControllers.createSubCategory);

router.get('/', subCategoryControllers.getSubCategories);

router.get('/:id', subCategoryControllers.getSubCategory);

router.patch('/:id', subCategoryControllers.updateSubCategory);

router.delete('/:id', subCategoryControllers.deleteSubCategory);




module.exports = router;