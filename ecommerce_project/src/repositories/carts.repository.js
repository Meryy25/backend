const { Cart, CartItem, User, Product } = require('../../models');

const getCart = async (user_id) => {
    return Cart.findOne({
        where: { user_id },
        include: [
            {
                model: User,
                attributes: {
                    exclude: ['password', 'role']
                }
            }
        ]
    });
};

const getCartItems = async (cart_id) => {
    return CartItem.findAll({
        where: { cart_id },
        include: [
            {
                model: Product,
            }
        ]
    });
};

const addToCart = async (cart_id, product_id, quantity) => {
    return CartItem.create({
        cart_id,
        product_id,
        quantity
    });
};

const changeProductQuantity = async (cartId, productId, quantity) => {
    const [, [updatedCartItem]] = await CartItem.update(
        { quantity },
        {
            where: {
                cart_id: cartId,
                product_id: productId
            },
            returning: true
        }
    );

    return updatedCartItem;
};

const emptyCart = async (cart_id, transaction) => {
        return CartItem.destroy({
            where: { cart_id },
            transaction
        });
}

const deleteProduct = async (cart_id, product_id) => {
    const deletedCount = await CartItem.destroy({
            where: {
                cart_id,
                product_id
            }
        })

    return deletedCount;
}

module.exports = {
    getCart,
    getCartItems,
    addToCart,
    changeProductQuantity,
    emptyCart,
    deleteProduct
};