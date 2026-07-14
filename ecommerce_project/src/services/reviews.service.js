const reviewRepository = require('../repositories/reviews.repository');
const productRepository = require('../repositories/products.repository');
const orderRepository = require('../repositories/orders.repository');
const { NotFoundError, UnauthorizedError } = require('../errors');
const orderItem = require('../../models/orderItem');

const listProductReviews = async (productId) => {
    const reviews = await reviewRepository.listProductReviews(productId);

    return reviews;
};

const createReview = async (userId, productId, review) => {
    const product = await productRepository.listOneProduct(productId);

    if(!product) {
        throw new NotFoundError('Product not found', 'PRODUCT_NOT_FOUND');
    }

    const orders = await orderRepository.listOneUsersOrders(userId);

    for(const order of orders) {
        const orderItems = await orderRepository.listAllOrderItems(order.id);

        const orderItem = orderItems.find(orderItem => orderItem.productId === productId);

        if(orderItem) {
            review.userId = userId;
            review.productId = productId;
            return reviewRepository.createReview(review);
        }
    }

    throw new UnauthorizedError('You can only leave a review for products you have purchased', 'PURCHASE_MISSING');
};

const deleteReview = async (userId, reviewId, isAdmin) => {
    const review = await reviewRepository.getReview(userId, reviewId);

    if(!isAdmin && !review) {
        throw new UnauthorizedError(`Review doesn't belong to you`, 'OTHER_REVIEW_ERR');
    }

    const deleted = await reviewRepository.deleteReview(reviewId);

    if(!deleted) {
        throw new NotFoundError(`Review with id ${reviewId} not found`, 'REVIEW_NOT_FOUND');
    }
};

module.exports = {
    listProductReviews,
    createReview,
    deleteReview
};