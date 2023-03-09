const express = require('express');

const SneakersRoutes = express.Router();
const { upload } = require('../../middlewares/files.middleware');
const { isAuth } = require('../../middlewares/auth.middleware');

const {
  createSneaker,
  getAllSneakers,
  deleteSneaker,
  updateSneaker,
} = require('../controllers/sneakers.controllers');

SneakersRoutes.get('/', getAllSneakers);
SneakersRoutes.post('/', [isAuth], upload.single('image'), createSneaker);
SneakersRoutes.delete('/:id', [isAuth], deleteSneaker);
SneakersRoutes.put('/:id', [isAuth], upload.single('image'), updateSneaker);

module.exports = SneakersRoutes;
