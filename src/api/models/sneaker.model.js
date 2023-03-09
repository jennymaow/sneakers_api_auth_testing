const mongoose = require('mongoose');

const SneakerSchema = new mongoose.Schema(
  {
    model: { type: String, required: true, trim: true },
    color: { type: String, required: true, trim: true },
    image: { type: String, required: false, trim: true },
    retailPrice: { type: Number, required: true, trim: true },
    style: { type: String, required: true, trim: true },
    brand: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
  }
);

const Sneaker = mongoose.model('Sneaker', SneakerSchema);

module.exports = Sneaker;
