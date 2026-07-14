const cartService = require("../services/carts.service");

const cartWithItems = async (req, res) => {
    const { id } = req.user;

    const cart = await cartService.cartWithItems(parseInt(id));

    res.json(cart);
};

const addProductToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const { id } = req.user;

    const cartItem = await cartService.addProductToCart(parseInt(id), parseInt(productId), quantity);

    res.status(201).json({ message: 'Item added', cartItem });
};

const updateQuantity = async (req, res) => {
    const { id } = req.user;
    const productId = req.params.id;
    const { quantity } = req.body;

    const cartItem = await cartService.updateQuantity(parseInt(id), parseInt(productId), quantity);

    res.status(201).json({ message: 'Update successed', cartItem });

};

const deleteCartItem = async (req, res) => {
    const { id } = req.user;
    const productId = req.params.id;

    await cartService.deleteCartItem(parseInt(id), productId);

    res.status(204).json();
};

module.exports = {
    cartWithItems,
    addProductToCart,
    updateQuantity,
    deleteCartItem
};