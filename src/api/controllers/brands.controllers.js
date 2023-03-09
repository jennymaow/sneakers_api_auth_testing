const Brand = require('../models/brand.model');
const enum_ = require('../../utils/enum');

const { deleteImgCloudinary } = require('../../middlewares/files.middleware');

const getAllBrands = async (req, res, next) => {
  try {
    const Brands = await Brand.find().populate('sneakers');
    let statusCode = Brands.length > 0 ? enum_.CODE_OK : enum_.CODE_NO_CONTENT;
    return res.status(statusCode).json(Brands);
  } catch (error) {
    return next(error);
  }
};

const createBrand = async (req, res, next) => {
  try {
    const brand = new Brand({
      ...req.body,
      image: req.file
        ? req.file.path
        : 'https://res.cloudinary.com/dnb4ujbgr/image/upload/v1678367680/elementor-placeholder-image_wlocaa.webp',
    });
    const createdBrand = await brand.save();
    return res.status(enum_.CODE_CREATED).json(createdBrand);
  } catch (error) {
    return next(error);
  }
};

const deleteBrand = async (req, res, next) => {
  try {
    const { id } = req.params;
    const brand = await Brand.findByIdAndDelete(id);
    if (brand.image) {
      deleteImgCloudinary(brand.img);
    }
    return res.status(enum_.CODE_OK).json(drand);
  } catch (error) {
    return next(error);
  }
};

const updateBrandAdd = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newBrand = new Brand(req.body);
    const originalBrand = await Brand.findById(id);
    newBrand._id = id;
    newBrand.sneakers = [...newBrand.sneakers, ...originalBrand.sneakers];

    if (req.file) {
      deleteImgCloudinary(originalBrand.image);
      newBrand.image = req.file.path;
    }

    await Brand.findByIdAndUpdate(id, newBrand);
    return res.status(enum_.CODE_OK).json(newBrand);
  } catch (error) {
    return next(error);
  }
};

const updateBrandDelete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const newBrand = new Brand(req.body);
    const originalBrand = await Brand.findById(id);
    newBrand._id = id;
    if (req.file) {
      deleteImgCloudinary(originalBrand.image);
      newBrand.image = req.file.path;
    }

    await Brand.findByIdAndUpdate(id, newBrand);
    return res.status(enum_.CODE_OK).json(newBrand);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createBrand,
  getAllBrands,
  deleteBrand,
  updateBrandAdd,
  updateBrandDelete,
};
