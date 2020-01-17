const express = require('express');
const actionRouter = require('./data/routers/actionRouter');
const server = express();

server.use(express.json());
server.use('/api/actions', actionRouter);

server.get('/', (req, res) => {
    res.send('<h1>Sprint challenge time!</h1>')
});

module.exports = server;