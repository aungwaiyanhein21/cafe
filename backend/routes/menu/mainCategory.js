const express = require('express');
const router = express.Router();

const categoryRoute = require('./category');

router.use('/:mainCategoryId/categories', categoryRoute);

const mainCategoryControllers = require('../../controllers/menu/mainCategoryControllers');

router.post('/', mainCategoryControllers.createMainCategory);

router.get('/', mainCategoryControllers.getMainCategories);

router.get('/:id', mainCategoryControllers.getMainCategory);

router.patch('/:id', mainCategoryControllers.updateMainCategory);

router.delete('/:id', mainCategoryControllers.deleteMainCategory);



module.exports = router;