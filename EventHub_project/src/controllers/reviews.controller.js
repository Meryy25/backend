const reviewService = require('../services/reviews.service');

const getReview = async (req, res) => {
    const reviews = await reviewService.getReview(req.params.id);

    res.send(reviews);
};

const createReview = async (req, res) => {
    const review = await reviewService.createReview(
        req.user.id,
        req.params.id, 
        req.body
    );

    res.send({ message: 'Review created', review });
};

const deleteReview = async (req, res) => {
    const deleted = await reviewService.deleteReview(req.user.id, req.params.id);

    res.send({ message: 'Review deleted', deleted });
};

module.exports = {
    getReview,
    createReview,
    deleteReview,
};