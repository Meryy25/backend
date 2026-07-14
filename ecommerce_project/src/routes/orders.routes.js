const express = require("express");
const orderController = require("../controllers/orders.controller");
const { authMiddleware, validateMiddleware } = require('../middleware');
const createOrderSchema = require('../zodValidations/order.validation');
const asyncHandler = require('../../utils/asyncHandler');

const router = express.Router();

router.post(
    '/checkout', 
    authMiddleware,
    validateMiddleware(createOrderSchema),
    asyncHandler(orderController.checkout));
router.get('/', asyncHandler(orderController.listOrders));
router.get('/:id', asyncHandler(orderController.orderWithItems));
router.patch('/:id/status', asyncHandler(orderController.updateOrderStatus));

module.exports = router;
