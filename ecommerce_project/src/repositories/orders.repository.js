const {
    Order,
    OrderItem,
    Product
} = require('../../models');

const createOrder = async (orderData, transaction) => {
    return await Order.create(
        {
            user_id: orderData.userId,
            total: orderData.total
        },
        {
            transaction
        }
    );
};

const createOrderItems = async (itemData, transaction) => {
    return await OrderItem.create(
        {
            order_id: itemData.orderId,
            product_id: itemData.productId,
            quantity: itemData.quantity,
            price_at_purchase: itemData.priceAtPurchase
        },
        {
            transaction
        }
    );
};

const listAllUsersOrders = async () => {
    return await Order.findAll({
        include: [
            {
                model: OrderItem,
                include: [Product]
            }
        ],
        order: [['created_at', 'DESC']]
    });
};

const listOneUsersOrders = async (userId) => {
    return await Order.findAll({
        where: {
            user_id: userId
        },
        include: [
            {
                model: OrderItem,
                include: [Product]
            }
        ],
        order: [['created_at', 'DESC']]
    });
};

const findUserOrder = async (userId, orderId) => {
    return await Order.findOne({
        where: {
            id: orderId,
            user_id: userId
        },
        include: [
            {
                model: OrderItem,
                include: [Product]
            }
        ]
    });
};

const changeOrderStatus = async (orderId, status) => {

    const order = await Order.findByPk(orderId);

    if (!order) {
        return null;
    }

    await order.update({
        status
    });

    return order;
};

module.exports = {
    createOrder,
    createOrderItems,
    listAllUsersOrders,
    listOneUsersOrders,
    findUserOrder,
    changeOrderStatus
};