const express = require("express");
const cartController = require("../controllers/carts.controller");
const { validateMiddleware, authMiddleware, adminMiddleware } = require('../middleware');
const { createCartSchema, updateCartSchema } = require('../zodValidations/cart.validation');
const asyncHandler = require('../../utils/asyncHandler');

const router = express.Router();

router.get('/', asyncHandler(cartController.cartWithItems));
router.post(
    '/items', 
    adminMiddleware,
    authMiddleware,
    validateMiddleware(createCartSchema),
    asyncHandler(cartController.addProductToCart));
router.put(
    '/items/:id', 
    adminMiddleware,
    authMiddleware,
    validateMiddleware(updateCartSchema),
    asyncHandler(cartController.updateQuantity));
router.delete(
    '/items/:id',
    adminMiddleware, 
    authMiddleware,
    asyncHandler(cartController.deleteCartItem));

module.exports = router;