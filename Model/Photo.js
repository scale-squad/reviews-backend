const mongoose = require("mongoose");
const { Schema } = mongoose;

const PhotoSchema = new Schema({
  id: { type: Number, required: true },
  review_id: { type: Number, required: true },
  url: { type: String, required: true },
});

module.exports = mongoose.model("Photo", PhotoSchema);
