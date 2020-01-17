const express = require('express');
const ProjectsDb = require('../helpers/projectModel');
const router = express.Router();

router.get('/', (req, res) => {
    ProjectsDb.get()
    .then(projects => {
        res.status(200).json(projects)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: "Error retrieving projects data from database." });
    });
});

router.get('/:id', validateId, (req, res) => {
    let id = req.params.id;
    ProjectsDb.get(id)
    .then(project => {
        res.status(200).json(project)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: "Error retrieving project data from database." })
    });
});

router.post('/', validateProject, (req, res) => {
    let actionBody = req.body;

    ProjectsDb.insert(actionBody)
    .then(action => {
        res.status(201).json(action);
    })
    .catch(err => {
        console.log(err);
        err.errno === 19
        ? res.status(500).json({ errorMessage: "Invalid project ID."})
        : res.status(500).json({ errorMessage: "Error posting project to database."});
    });
});

router.delete('/:id', validateId, (req, res) => {
    let id = req.params.id;
    ProjectsDb.remove(id)
    .then(count => {
        count < 1
        ? res.status(404).json({ errorMessage: "Project ID not found." })
        : res.status(200).json({ message: "Project deleted." });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: "Error removing project from database." });
    });
});

router.put('/:id', validateId, (req, res) => {
    let id = req.params.id;
    let changes = req.body;

    ProjectsDb.update(id, changes)
    .then(changedProject => {
        res.status(200).json(changedProject);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ errorMessage: "Error editing project in database." });
    });
});

// middleware

function validateId(req, res, next) {
let id = req.params.id;
ProjectsDb.get(id)
.then(action => {
    ! action 
    ? res.status(404).json({ errorMessage: "ID not found." })
    : next();
})
.catch(err => {
    console.log(err);
    res.status(500).json({ errorMessage: "Error checking ID in database." })
})
}

function validateProject(req, res, next) {
    let description = req.body.description;
    let name = req.body.name;

    !name || !description 
    ? res.status(400).json({ errorMessage: "Please supply a name and description." })
    : next();
}

module.exports = router;