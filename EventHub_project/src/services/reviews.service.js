const Review = require('../models/Review');
const { UnauthorizedError } = require('../errors');

const getReview = async () => {
    return await Review.find();
};

const createReview = async (userId, id, reviewData) => {
    const newReview = await Review.create({
        memberId: userId,
        eventId: id,
        ...reviewData,
    });

    return newReview;
};

const deleteReview = async (userId, id) => {
    const review = await Review.findById(id);

    if(review.memberId.toString() !== userId) {
        throw new UnauthorizedError('Only member can delete review', 'UNAUTHORIZED');
    }

    await Review.findByIdAndDelete(id);

    return review;
};

module.exports = {
    getReview,
    createReview,
    deleteReview,
};