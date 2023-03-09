const express = require('express');

const UsersRoutes = express.Router();

const { registerUser, loginUser } = require('../controllers/users.controllers');

UsersRoutes.post('/login', loginUser);
UsersRoutes.post('/register', registerUser);

module.exports = UsersRoutes;
