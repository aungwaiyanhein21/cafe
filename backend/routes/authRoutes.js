const { Router } = require('express');

const authControllers = require('../controllers/authControllers');

const router = Router();

router.post('/signup', authControllers.signUp);
router.post('/login', authControllers.login);
router.get('/logout', authControllers.logout);
router.get('/confirmation/:token', authControllers.confirmation);

module.exports = router;