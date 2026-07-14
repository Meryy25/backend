const orderRepository = require('../repositories/orders.repository');
const cartRepository = require('../repositories/carts.repository');
const productRepository = require('../repositories/products.repository');
const { sequelize } = require('../../models');
const {
    NotFoundError,
    BadRequestError
} = require('../errors');

const checkout = async (userId) => {
    return await sequelize.transaction(async (transaction) => {
        const cart = await cartRepository.getCart(userId);
        
        if(!cart) {
            throw new NotFoundError('Cart not found', 'CART_NOT_FOUND');
        }

        const cartItems = await cartRepository.getItems(cart.id);

        if(!cartItems.length) {
            throw new BadRequestError('Cart is empty', 'EMPTY_CART');
        }

        const orderItems = [];
        let totalAmount = 0;

        for(const item of cartItems) {
            if(item.quantity > item.product.stock) {
                throw new BadRequestError(`Product with id ${item.product.id} does not have enough stock`, 'QUANTITY_ERR');
            }

            orderItems.push({
                productId: item.product.id,
                quantity: item.quantity,
                priceAtPurchase: item.product.price
            });

            totalAmount += Number(item.product.price) * item.quantity;
        }

        const createdOrder = await orderRepository.createOrder(
            {
                userId,
                total: totalAmount
            },
            transaction
        );

        for(const item of orderItems) {
            item.orderId = createdOrder.id;

            await orderRepository.createOrderItems(item, transaction);

            await productRepository.decrementStock(stock, item.quantity, item.productId, transaction);
        }

        await cartRepository.emptyCart(cart.id, transaction);

        return createdOrder;
    });
};

const listOrders = async (userId, isAdmin) => {
    if(isAdmin) {
        return await orderRepository.listAllUsersOrders();
    }

    return await orderRepository.listOneUsersOrders(userId);
};

const orderWithItems = async (userId, orderId) => {
    const order = await orderRepository.findUserOrder(userId, orderId);

    for(const order of userOrders) {
        if(order.id === orderId) {
            return order;
        }
    }

    throw new NotFoundError(`Order with id ${orderId} not found`, 'ORDER_NOT_FOUND');
};

const updateOrderStatus = async (orderId, status) => {
    const updatedOrder = await orderRepository.changeOrderStatus(orderId, status);

    if(!updatedOrder) {
        throw new NotFoundError(`Order with id ${orderId} not found`, 'ORDER_NOT_FOUND');
    }

    return updatedOrder;
};

module.exports = {
    checkout,
    listOrders,
    orderWithItems,
    updateOrderStatus
};