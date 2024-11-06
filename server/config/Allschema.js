const mongoose = require("mongoose");
const { Schema } = mongoose;

const CharacteristicSchema = new Schema({
  id: { type: Number, required: true },
  product_id: { type: Number, required: true },
  name: { type: String, required: true },
});


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
  review_id: { type: Number, required: true },
  product_id: { type: Number, required: true },
  rating: { type: Number, required: true },
  summary: { type: String, maxlength: 255 },
  body: { type: String, required: true },
  recommend: { type: Boolean, required: true },
  response: { type: String, default: null },
  reviewer_name: { type: String, required: true },
  email: { type: String },
  date: { type: Date, default: Date.now },
  helpfulness: { type: Boolean, default: false },
  reported: { type: Boolean, default: false },
  photos: [PhotoSchema],
  characteristics: { type: Map, of: new Schema({
    id: Number,
    value: Number,
  }) },
});

ReviewSchema.index({ review_id: 1 });
ReviewSchema.index({ product_id: 1 });

const Review = mongoose.model("Review", ReviewSchema);
const Characteristic = mongoose.model("Characteristic", CharacteristicSchema);
const CharacteristicReview = mongoose.model("CharacteristicReview", CharacteristicReviewSchema);

