module.exports.Builder = {
  sneaker: ({
    model = 'a',
    color = 'a',
    image = 'https://res.cloudinary.com/dnb4ujbgr/image/upload/v1678367680/elementor-placeholder-image_wlocaa.webp',
    retailPrice = 20,
    style = 'a',
    brand = 'a',
  } = {}) => ({
    model,
    color,
    image,
    retailPrice,
    style,
    brand,
  }),
};
