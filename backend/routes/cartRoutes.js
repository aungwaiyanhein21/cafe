const express = require('express');
const router = express.Router();

const cartControllers = require('../controllers/cartControllers');

router.post('/', cartControllers.addCartProducts);
router.get('/', cartControllers.getCartProducts);
router.patch('/:id', cartControllers.updateCartProduct);
router.delete('/:id', cartControllers.removeCartProduct);


module.exports = router;