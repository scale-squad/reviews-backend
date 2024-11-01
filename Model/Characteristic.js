const mongoose = require("mongoose");
const { Schema } = mongoose;

const CharacteristicSchema = new Schema({
  id: { type: Number, required: true },
  product_id: { type: Number, required: true },
  name: { type: String, required: true },
});

module.exports = mongoose.model("Characteristic", CharacteristicSchema);
