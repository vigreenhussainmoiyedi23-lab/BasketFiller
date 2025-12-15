const express = require('express');
const router = express.Router();
const { UserCanAcces } = require('../middlewares/AuthenticationMiddleware');

const { addToCartHandler, RemoveFromCartHandler, IncreaseQuantityHandler, DecreaseQuantityHandler } = require('../controllers/cart.controllers');

router.post('/add/:productId', UserCanAcces,addToCartHandler)
router.post('/remove/:productId', UserCanAcces,RemoveFromCartHandler)
router.post('/increase/:productId', UserCanAcces ,IncreaseQuantityHandler)
router.post('/decrease/:productId', UserCanAcces,DecreaseQuantityHandler)



module.exports = router;