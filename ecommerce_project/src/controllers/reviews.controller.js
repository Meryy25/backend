const reviewService = require("../services/reviews.service");

const listProductReviews = async (req, res) => {
    const reviews = await reviewService.listProductReviews(req.params);

    res.json(reviews);
};

const createReview = async (req, res) => {
    const review = await reviewService.createReview(req.params.id, req.body);

    res.status(201).json({ message: 'Review posted', review });
};

const deleteReview = async (req, res) => {
    const userId = req.user.id;
    const reviewId = req.params.id;
    let isAdmin = false;

    if(req.user.role === 'admin') {
        isAdmin = false;
    }

    await reviewService.deleteReview(parseInt(userId), parseInt(reviewId), isAdmin);

    res.status(204).json();
};

module.exports = {
    listProductReviews,
    createReview,
    deleteReview
};