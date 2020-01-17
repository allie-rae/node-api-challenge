const express = require('express');
const ActionsDb = require('../helpers/actionModel');
const router = express.Router();

router.get('/', (req, res) => {
    ActionsDb.get()
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: "Error retrieving actions data from database." });
    });
});

router.get('/:id', (req, res) => {
    let id = req.params.id;
    ActionsDb.get(id)
    .then(action => {
        res.status(200).json(action)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: "Error retrieving action data from database." })
    });
});

module.exports = router;