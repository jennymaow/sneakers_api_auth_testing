const mongoose = require('mongoose');

const BrandSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    founders: { type: String, required: true, trim: true },
    year: { type: Number, required: true, trim: true },
    country: { type: String, required: true, trim: true },
    sneakers:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Sneaker', required:false }],
  },
  {
    timestamps: true,
  }
);

const Brand = mongoose.model('Brand', BrandSchema);

module.exports = Brand;