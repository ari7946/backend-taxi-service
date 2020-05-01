const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('./api/auth/authenticate');
const authRouter = require('./api/auth/authRouter');
const tripsRouter = require('./api/trips/tripsRouter');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api', authRouter);
server.use('/api/trips', tripsRouter);

server.get('/', (req, res) => {
  res.send("<p>Hello World!</p>");
});

module.exports = server;