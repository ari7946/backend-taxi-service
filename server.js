const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authRouter = require('./api/auth/authRouter');
const tripsRouter = require('./api/trips/tripsRouter');
const usersRouter = require('./api/users/usersRouter');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api', authRouter);
server.use('/api/trips', tripsRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.send("<p>Hello World!</p>");
});

module.exports = server;