const { Review, User, Product } = require('../../models');

const listProductReviews = async (product_id) => {
    return Review.findAll({
        where: { product_id },
        include: [
            {
                model: User
            },
            {
                model: Product
            }
        ]
    });
};

const createReview = async (review) => {
    return Review.create(review);
};

const getReview = async (user_id, review_id) => {
    return Review.findOne({
        where: {
            id: review_id,
            user_id
        }
    });
};

const deleteReview = async (review_id) => {
    return Review.destroy({
        where: { id: review_id }
    });
};

module.exports = {
    listProductReviews,
    createReview,
    getReview,
    deleteReview
};