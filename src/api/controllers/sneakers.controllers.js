const Sneaker = require('../models/sneaker.model');
const enum_ = require('../../utils/enum');

const { deleteImgCloudinary } = require('../../middlewares/files.middleware');

const getAllSneakers = async (req, res, next) => {
  try {

    if (req.query.page && !isNaN(parseInt(req.query.page))) {
      const numSneakers = await Sneaker.countDocuments();
      let page = parseInt(req.query.page);
      let limit = req.query.limit ? parseInt(req.query.limit) : 10;
      let numPages = numSneakers % limit > 0 ? numSneakers / limit + 1 : numSneakers / limit;
      if (page > numPages) {
        page = 1;
      }

      const skip = (page - 1) * 10;

      const allSneakers = await Sneaker.find().skip(skip).limit(limit);
      return res.status(enum_.CODE_OK).json({
        info: {
          total: numSneakers,
          page: page,
          limit: limit,
          next:
            numPages >= page + 1 ? `/sneakers?page=${page + 1}&limit=${limit}` : null,
          prev: page != 1 ? `/sneakers?page=${page - 1}&limit=${limit}` : null,
        },
        results: allSneakers,
      });
    } else {
      const allSneakers = await Sneaker.find().limit(10);
      const numSneakers = await Sneaker.countDocuments();
      return res.status(enum_.CODE_OK).json({
        info: {
          total: numSneakers,
          page: 1,
          limit: 10,
          next: numSneakers > 10 ? `/sneakers?page=2&limit=10` : null,
          prev: null,
        },
        results: allSneakers,
      });
    }
  } catch (error) {
    return next('Sneakers not found', error);
  }
};

const createSneaker = async (req, res, next) => {
  try {
    const sneaker = new Sneaker({
      ...req.body,
      image: req.file
        ? req.file.path
        : 'https://res.cloudinary.com/dnb4ujbgr/image/upload/v1678367680/elementor-placeholder-image_wlocaa.webp',
    });
    const createdSneaker = await sneaker.save();
    return res.status(enum_.CODE_CREATED).json(createdSneaker);
  } catch (error) {
    return next('Error creating sneakers', error);
  }
};

const deleteSneaker = async (req, res, next) => {
  try {
    const { id } = req.params;
    const sneaker = await Sneaker.findByIdAndDelete(id);
    if (sneaker.image) {
      deleteImgCloudinary(sneaker.image);
    }
    return res.status(enum_.CODE_OK).json(sneaker);
  } catch (error) {
    return next(error);
  }
};

const updateSneaker = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newSneaker = new Sneaker(req.body);
    newSneaker._id = id;
    const originalSneaker = await Sneaker.findById(id);

    if (req.file) {
      deleteImgCloudinary(originalSneaker.image);
      newSneaker.image = req.file.path;
    }

    await Sneaker.findByIdAndUpdate(id, newSneaker);
    return res.status(enum_.CODE_OK).json(newSneaker);
  } catch (error) {
    return next(error);
  }
};

module.exports = { createSneaker, getAllSneakers, deleteSneaker, updateSneaker };
