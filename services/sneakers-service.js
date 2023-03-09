const Sneaker = require('../src/api/models/sneaker.model');

module.exports.store = async ({ model, color, image, retailPrice, style, brand }) => {
  const sneaker = new Sneaker({
    model,
    color,
    image,
    retailPrice,
    style,
    brand,
  });
  await sneaker.save();
  return sneaker;
};
