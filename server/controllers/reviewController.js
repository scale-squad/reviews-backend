const { v4: uuidv4 } = require("uuid");
const NodeCache = require("node-cache");
const { getCollection } = require("../config/db");

const cache = new NodeCache({ stdTTL: 3600 });

const startUpSetting = async (req, res) => {
  return res.json({
    _id: '672bab1f30bf8836c5ccaf92',
    review_id: 'c2c1afaa-9d38-4d05-80d3-4e928b2896ea',
    product_id: 1,
    rating: 5,
    summary: 'Great product',
    body: 'I really enjoyed this product.',
    recommend: true,
    reviewer_name: 'John Doe',
    email: 'john.doe@example.com',
    photos: [],
    characteristic:{},
  });
};

const getReviewById = async (req, res) => {
  const reviewId = parseInt(req.params.review_id);
  const cachedReview = cache.get(`review_${reviewId}`);
  if (cachedReview) {
    return res.json(cachedReview);
  }
  const collection = getCollection();
  try {
    const review = await collection.findOne({ review_id: reviewId });
    if (review) {
      cache.set(`review_${reviewId}`, review);
    }
    res.json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getReviews = async (req, res) => {
  const { page = 1, count = 10, sort = "newest", product_id } = req.query;
  if (!product_id) {
    return res.status(400).json({ error: "Product ID is required" });
  }

  const cacheKey = `reviews_${product_id}_${page}_${count}`;
  const cachedReviews = cache.get(cacheKey);
  if (cachedReviews) {
    return res.status(200).json(cachedReviews);
  }

  const query = { product_id: parseInt(product_id) };
  const skip = (page - 1) * count;
  const limit = parseInt(count);
  const collection = getCollection();

  try {
    const reviews = await collection
      .find(query, { projection: { characteristics: 0 } })
      .skip(skip)
      .limit(limit)
      .toArray();
    const response = {
      product: product_id,
      page,
      count,
      results: reviews,
    };
    cache.set(cacheKey, response);
    res.status(200).json(response);
  } catch (err) {
    console.error(`Error fetching reviews for product_id: ${product_id}`, err);
    res.status(500).json({ error: err.message });
  }
};

const getReviewMeta = async (req, res) => {
  const productId = parseInt(req.params.product_id);
  const cacheKey = `meta_${productId}`;
  const cachedMeta = cache.get(cacheKey);
  if (cachedMeta) {
    return res.status(200).json(cachedMeta);
  }

  if (!productId) {
    return res.status(400).json({ error: "Product ID is required" });
  }

  const collection = getCollection();
  try {
    const metadata = await collection
      .aggregate([
        { $match: { product_id: productId } },
        {
          $group: {
            _id: "$product_id",
            ratings: { $push: "$rating" },
            recommended: { $push: "$recommend" },
            characteristics: { $push: "$characteristics" },
          },
        },
      ])
      .toArray();
      if (metadata.length === 0) {
        return res.status(203).json({ error: "No metadata found for this product" });
      }

    const ratings = {};
    metadata[0].ratings.forEach((rating) => {
      ratings[rating] = (ratings[rating] || 0) + 1;
    });
    const recommended = {};
    metadata[0].recommended.forEach((recommend) => {
      recommended[recommend ? 1 : 0] =
        (recommended[recommend ? 1 : 0] || 0) + 1;
    });
    const response = {
      product_id: productId,
      ratings: ratings,
      recommended: recommended,
      characteristics: metadata[0].characteristics,
    };
    cache.set(cacheKey, response);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createReview = async (req, res) => {
  const newReviewId = uuidv4();
  const review = {
    ...req.body,
    review_id: newReviewId,
    helpfulness: req.body.helpfulness ?? 1,
    reported: req.body.reported ?? false,
  };
  const collection = getCollection();
  try {
    await collection.insertOne(review);
    res.status(201).json({ message: "Review added successfully" });
  } catch (err) {
    console.error("Error inserting review:", err);
    res.status(500).json({ error: err.message });
  }
};

const markReviewAsHelpful = async (req, res) => {
  const reviewId = parseInt(req.params.review_id);
  const collection = getCollection();
  try {
    const result = await collection.updateOne(
      { review_id: reviewId },
      { $inc: { helpfulness: 1 } }
    );
    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json({ message: "Review marked as helpful" });
  } catch (err) {
    console.error("Error marking review as helpful:", err);
    res.status(500).json({ error: err.message });
  }
};

const reportReview = async (req, res) => {
  const reviewId = parseInt(req.params.review_id);
  const collection = getCollection();
  try {
    await collection.updateOne(
      { review_id: reviewId },
      { $set: { reported: true } }
    );
    res.status(200).json({ message: "Review reported" });
  } catch (err) {
    console.error("Error reporting review:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  startUpSetting,
  getReviewById,
  getReviews,
  getReviewMeta,
  createReview,
  markReviewAsHelpful,
  reportReview,
};