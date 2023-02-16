const express = require('express');
const router = express.Router();

'use strict';

const fs = require('fs');
let rawdata = fs.readFileSync('data.json');
let data = JSON.parse(rawdata);


// READ
router.get('/', function (req, res) {
    res.status(200).json(data);
});

// READ with ID
router.get('/:id', function (req, res) {
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id);
    });
    if (found) {
        res.status(200).json(found);
    } else {
        res.sendStatus(404);
    }
});

// CREATE
router.post('/', function (req, res) {
    let itemIds = data.map(item => item.id);
    let newId = itemIds.length > 0 ? Math.max.apply(Math, itemIds) + 1 : 1;
   
    let newItem = {
        id: newId,
        title: req.body.title,
        completed: req.body.completed, 
    };

    data.push(newItem);
    res.status(201).json(newItem);
});

// UPDATE
router.put('/:id', function (req, res) {
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id);
    });

    if (found) {
        let updated = {
            id: found.id,
            title: req.body.title, 
            completed: req.body.completed
        };

        let targetIndex = data.indexOf(found);

        data.splice(targetIndex, 1, updated);

        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
});

// DELETE
router.delete('/:id', function (req, res) {
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id);
    });
    if (found) {
        let targetIndex = data.indexOf(found);
        data.splice(targetIndex, 1);
    }
    res.sendStatus(204);
});

module.exports = router;