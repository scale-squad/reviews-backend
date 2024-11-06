// routes/reviewRoutes.js
const express = require("express");
const reviewController = require("../controllers/reviewController");

const router = express.Router();

router.get("/", reviewController.startUpSetting);
router.get("/reviews/:review_id", reviewController.getReviewById);
router.get("/reviews", reviewController.getReviews);
router.get("/reviews/meta/:product_id", reviewController.getReviewMeta);
router.post("/reviews", reviewController.createReview);
router.put("/reviews/:review_id/helpful", reviewController.markReviewAsHelpful);
router.put("/reviews/:review_id/report", reviewController.reportReview);

module.exports = router;