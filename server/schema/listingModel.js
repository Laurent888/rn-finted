const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  Owner: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("listing", listingSchema);
