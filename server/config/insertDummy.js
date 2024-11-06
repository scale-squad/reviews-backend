const mongoose = require("mongoose");
const { Schema } = mongoose;

const CharacteristicSchema = new Schema({
  id: { type: Number, required: true },
  product_id: { type: Number, required: true },
  name: { type: String, required: true },
});

CharacteristicSchema.index({ product_id: 1 });
CharacteristicSchema.index({ name: 1 });

const CharacteristicReviewSchema = new Schema({
  id: { type: Number, required: true },
  characteristic_id: { type: Number, required: true },
  review_id: { type: Number, required: true },
  value: { type: Number, required: true },
});

CharacteristicReviewSchema.index({ characteristic_id: 1 });
CharacteristicReviewSchema.index({ review_id: 1 });

const PhotoSchema = new Schema({
  id: { type: Number, required: true },
  review_id: { type: Number, required: true },
  url: { type: String, required: true },
});

PhotoSchema.index({ review_id: 1 });

const ReviewSchema = new Schema({
  review_id: { type: String, required: true },
  product_id: { type: String, required: true },
  rating: { type: String, required: true },
  summary: { type: String, maxlength: 255 },
  body: { type: String, required: true },
  recommend: { type: Boolean, required: true },
  response: { type: String, default: null },
  reviewer_name: { type: String, required: true },
  email: { type: String },
  date: { type: Date, default: Date.now },
  helpfulness: { type: Number, default: 1, max: 5 },
  reported: { type: Boolean, default: false },
  photos: [PhotoSchema],
  characteristics: { type: Map, of: new Schema({
    id: Number,
    value: Number,
  }) },
});

ReviewSchema.index({ product_id: 1, review_id: 1 });
ReviewSchema.index({ rating: 1 });

const Review = mongoose.model("Review", ReviewSchema);
const Characteristic = mongoose.model("Characteristic", CharacteristicSchema);
const CharacteristicReview = mongoose.model("CharacteristicReview", CharacteristicReviewSchema);


mongoose
  .connect("mongodb://127.0.0.1:27017/thischord", {
    useNewUrlParser: true,
  })
  .then(async () => {
    console.log("Connected to MongoDB");

    const dummyData = [
      {
        review_id: 4,
        product_id: 13325,
        rating: 4,
        summary: "Good quality product",
        body: "The product met my expectations and is sustainably sourced. Would recommend.",
        recommend: true,
        response: null,
        reviewer_name: "john.doe",
        email: "johndoe@example.com",
        date: new Date(1600000000000),
        reported: false,
        helpfulness: 2,
        characteristics: {
          1: { id: 1, value: 5 },
          2: { id: 2, value: 4 },
        },
      },
      {
        review_id: 2,
        product_id: 3,
        rating: 4,
        summary: "Good quality product",
        body: "The product met my expectations and is sustainably sourced. Would recommend.",
        recommend: true,
        response: null,
        reviewer_name: "john.doe",
        email: "johndoe@example.com",
        date: new Date(1600000000000),
        reported: false,
        helpfulness: 2,
        characteristics: {
          1: { id: 1, value: 5 },
          2: { id: 2, value: 4 },
        },
      },
      {
        review_id: 3,
        product_id: 6,
        rating: 4,
        summary: "Good quality product",
        body: "The product met my expectations and is sustainably sourced. Would recommend.",
        recommend: true,
        response: null,
        reviewer_name: "john.doe",
        email: "johndoe@example.com",
        date: new Date(1600000000000),
        reported: false,
        helpfulness: 2,
        characteristics: {
          1: { id: 1, value: 5 },
          2: { id: 2, value: 4 },
        },
      },
      {
        review_id: 4,
        product_id: 8,
        rating: 4,
        summary: "Good quality product",
        body: "The product met my expectations and is sustainably sourced. Would recommend.",
        recommend: true,
        response: null,
        reviewer_name: "john.doe",
        email: "johndoe@example.com",
        date: new Date(1600000000000),
        reported: false,
        helpfulness: 2,
        characteristics: {
          1: { id: 1, value: 5 },
          2: { id: 2, value: 4 },
        },
      },
      {
        review_id: 5,
        product_id: 9,
        rating: 4,
        summary: "Good quality product",
        body: "The product met my expectations and is sustainably sourced. Would recommend.",
        recommend: true,
        response: null,
        reviewer_name: "john.doe",
        email: "johndoe@example.com",
        date: new Date(1600000000000),
        reported: false,
        helpfulness: 2,
        characteristics: {
          1: { id: 1, value: 5 },
          2: { id: 2, value: 4 },
        },
      },
      {
        review_id: 6,
        product_id: 10,
        rating: 4,
        summary: "Good quality product",
        body: "The product met my expectations and is sustainably sourced. Would recommend.",
        recommend: true,
        response: null,
        reviewer_name: "john.doe",
        email: "johndoe@example.com",
        date: new Date(1600000000000),
        reported: false,
        helpfulness: 2,
        characteristics: {
          1: { id: 1, value: 5 },
          2: { id: 2, value: 4 },
        },
      },
      {
        review_id: 7,
        product_id: 11,
        rating: 4,
        summary: "Good quality product",
        body: "The product met my expectations and is sustainably sourced. Would recommend.",
        recommend: true,
        response: null,
        reviewer_name: "john.doe",
        email: "johndoe@example.com",
        date: new Date(1600000000000),
        reported: false,
        helpfulness: 2,
        characteristics: {
          1: { id: 1, value: 5 },
          2: { id: 2, value: 4 },
        },
      },
      {
        review_id: 8,
        product_id: 31,
        rating: 4,
        summary: "Good quality product",
        body: "The product met my expectations and is sustainably sourced. Would recommend.",
        recommend: true,
        response: null,
        reviewer_name: "john.doe",
        email: "johndoe@example.com",
        date: new Date(1600000000000),
        reported: false,
        helpfulness: 2,
        characteristics: {
          1: { id: 1, value: 5 },
          2: { id: 2, value: 4 },
        },
      },
      {
        review_id: 9,
        product_id: 43,
        rating: 4,
        rating: 4,
        summary: "Good quality product",
        body: "The product met my expectations and is sustainably sourced. Would recommend.",
        recommend: true,
        response: null,
        reviewer_name: "john.doe",
        email: "johndoe@example.com",
        date: new Date(1600000000000),
        reported: false,
        helpfulness: 2,
        characteristics: {
          1: { id: 1, value: 5 },
          2: { id: 2, value: 4 },
        },
      },
      {
        review_id: 10,
        product_id: 58,
        rating: 4,
        rating: 4,
        summary: "Good quality product",
        body: "The product met my expectations and is sustainably sourced. Would recommend.",
        recommend: true,
        response: null,
        reviewer_name: "john.doe",
        email: "johndoe@example.com",
        date: new Date(1600000000000),
        reported: false,
        helpfulness: 2,
        characteristics: {
          1: { id: 1, value: 5 },
          2: { id: 2, value: 4 },
        },
      },
      {
        review_id: 11,
        product_id: 73,
        rating: 4,
        rating: 4,
        summary: "Good quality product",
        body: "The product met my expectations and is sustainably sourced. Would recommend.",
        recommend: true,
        response: null,
        reviewer_name: "john.doe",
        email: "johndoe@example.com",
        date: new Date(1600000000000),
        reported: false,
        helpfulness: 2,
        characteristics: {
          1: { id: 1, value: 5 },
          2: { id: 2, value: 4 },
        },
      },
      {
        review_id: 12,
        product_id: 93,
        rating: 4,
        rating: 4,
        summary: "Good quality product",
        body: "The product met my expectations and is sustainably sourced. Would recommend.",
        recommend: true,
        response: null,
        reviewer_name: "john.doe",
        email: "johndoe@example.com",
        date: new Date(1600000000000),
        reported: false,
        helpfulness: 2,
        characteristics: {
          1: { id: 1, value: 5 },
          2: { id: 2, value: 4 },
        },
      },
    ];

    await Review.insertMany(dummyData);
    console.log("Dummy data inserted");

    // 断开连接
    mongoose.disconnect();
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });