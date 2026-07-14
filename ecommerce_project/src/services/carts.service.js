const cartRepository = require('../repositories/carts.repository');
const productRepository = require('../repositories/products.repository');
const { NotFoundError } = require('../errors');

const cartWithItems = async (userId) => {
    const cart = await cartRepository.getCart(userId);
    
    if(!cart) {
        throw new NotFoundError('Cart not cound', 'CART_NOT_FOUND');
    }

    const cartItems = await cartRepository.getCartItems(cart.id);

    if(!cartItems.length) return cart;

    return cartItems;
};

const addProductToCart = async (userId, productId, quantity) => {
    const cart = await cartRepository.getCart(userId);

    if(!cart) {
        throw new NotFoundError('Cart not found', 'CART_NOT_FOUND');
    }

    const product = await productRepository.listOneProduct(productId);

    if(!product) {
        throw new NotFoundError('Product not found', 'PRODUCT_NOT_FOUND');
    }

    const cartItems = await cartRepository.getCartItems(cart.id);

    const cartProduct = cartItems.find(item => item.productId === productId);

    if(!cartProduct) {
        return cartRepository.addToCart(cart.id, productId, quantity);
    }

    const newQuantity = cartProduct.quantity + quantity;

    const updated = await cartRepository.changeProductQuantity(cart.id, productId, newQuantity);

    return updated;
};

const updateQuantity = async (userId, productId, quantity) => {
    const cart = await cartRepository.getCart(userId);

    if(!cart) {
        throw new NotFoundError('Cart not found', 'CART_NOT_FOUND');
    }

    const product = await productRepository.listOneProduct(productId);

    if(!product) {
        throw new NotFoundError(`Product with Id ${productId} not found`, 'PRODUCT_NOT_FOUND');
    }

    const cartItems = await cartRepository.getCartItems(cart.id);

    const cartProduct = cartItems.find(item => item.productId === productId);

    if(!cartProduct) {
        throw new NotFoundError(`Product with ID ${productId} not found, add it to cart et first`, 'CART_ITEM_NOT_FOUND');
    }

    return cartRepository.changeProductQuantity(cart.id, productId, quantity);
};

const deleteCartItem = async (userId, productId) => {
    const cart = await cartRepository.getCart(userId);

    if(!cart) {
        throw new NotFoundError('Cart not found', 'CART_NOT_FOUND');
    }

    const deletedCount = await cartRepository.deleteProduct(cart.id, productId);

    if(!deletedCount) {
        throw new NotFoundError(`Product with ID ${productId} not found`, 'PROD_NOT_FOUND');
    }

    return deletedCount;
};

module.exports = {
    cartWithItems,
    addProductToCart,
    updateQuantity,
    deleteCartItem
};