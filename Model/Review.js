const mongoose = require("mongoose");
const { Schema } = mongoose;
const PhotoSchema = require("./Photo").schema;
const CharacteristicSchema = require("./Characteristic").schema;

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
  helpfulness: { type: Number, default: 0 },
  reported: { type: Boolean, default: false },
  photos: [PhotoSchema],
  characteristics: { type: Map, of: CharacteristicSchema },
});

module.exports = mongoose.model("Review", ReviewSchema);
