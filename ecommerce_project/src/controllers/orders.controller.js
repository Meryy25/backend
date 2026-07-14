const orderService = require("../services/orders.service");

const checkout = async (req, res) => {
    const { id } = req.user;

    const order = await orderService.checkout(parseInt(id));

    res.status(201).json(order);
};

const listOrders = async (req, res) => {
    const { id } = req.user;
    let isAdmin = false;

    if(req.user.role === 'admin') {
        isAdmin = true;
    }

    const orders = await orderService.listOrders(parseInt(id), isAdmin);

    res.json(orders);
};

const orderWithItems = async (req, res) => {
    const userId = req.user.id;
    const { id } = req.params;

    const order = await orderService.orderWithItems(parseInt(userId), parseInt(id));

    res.json(order);
};

const updateOrderStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    const order = await orderService.updateOrderStatus(parseInt(id), status);

    res.json({ message: 'status updated', order });
};

module.exports = {
    checkout,
    listOrders,
    orderWithItems,
    updateOrderStatus
};