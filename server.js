const express = require('express');
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('<h1>Sprint challenge time!</h1>')
});

module.exports = server;