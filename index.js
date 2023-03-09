const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connect = require('./src/utils/connect');
const { configCloudinary } = require('./src/middlewares/files.middleware');
const UsersRoutes = require('./src/api/routes/users.routes');
const SneakersRoutes = require('./src/api/routes/sneakers.routes');
const BrandsRoutes = require('./src/api/routes/brands.routes');
dotenv.config();

const server = express();

connect();
configCloudinary();

const PORT = process.env.PORT || 8888;

server.use(
  cors({
    origin: '*',
    credentials: true,
  })
);

server.use(express.json({ limit: '5mb' }));
server.use(express.urlencoded({ limit: '5mb', extended: true }));

server.use('/users', UsersRoutes);
server.use('/sneakers', SneakersRoutes);
server.use('/brands', BrandsRoutes);

server.use('*', (req, res, next) => {
  const error = new Error('Route not found');
  error.status = 404;
  return next(error);
});

server.use((error, req, res) => {
  return res.status(error.status || 500).json(error.message || 'Unexpected error');
});

server.disable('x-powered-by');

//Solo se arranca si está en index (en el test no)

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT} `);
  });
}

module.exports = server;
