const express = require('express');

const TripsRouter = require('./trips/trips-router.js');

const server = express();

server.use(express.json());
//server.use('/api', TripsRouter);

module.exports = server;