const express = require('express');

const BrandsRoutes = express.Router();
const { isAuth } = require('../../middlewares/auth.middleware');

const {
  createBrand,
  getAllBrands,
  deleteBrand,
  updateBrandAdd,
  updateBrandDelete,
} = require('../controllers/Brands.controllers');

BrandsRoutes.get('/', getAllBrands);
BrandsRoutes.post('/', [isAuth], createBrand);
BrandsRoutes.delete('/:id', [isAuth], deleteBrand);
BrandsRoutes.put('/:id', [isAuth], updateBrandAdd);
BrandsRoutes.patch('/:id', [isAuth], updateBrandDelete);


module.exports = BrandsRoutes;
