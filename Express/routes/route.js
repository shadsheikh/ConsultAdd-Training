const express = require("express")
const router = express.Router();

const fs = require('fs');
const dataPath = './data/data.json'

const saveAccountData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync(dataPath, stringifyData)
}

const getAccountData = () => {
    const jsonData = fs.readFileSync(dataPath)
    return JSON.parse(jsonData) 
}

// READ
router.get('/getUser', function (req, res) {
    const accounts = getAccountData()
    res.send(accounts)
});

//READ By ID
router.get('/getUserById/:id', function (req, res) {
    var existAccounts = getAccountData()
    let found = existAccounts.find(function (item) {
        return item.id === parseInt(req.params.id);
    });
    if(found){
        res.send(found)
    }
    else{
        res.sendStatus(404);
    }
 });

// CREATE
router.post('/addUser', function (req, res) {
    var data = getAccountData()
    let newItem = {
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        pwd: req.body.pwd,
        role: req.body.role, 
    };
    data.push(newItem)
    saveAccountData(data);
    res.send({success: true, msg: 'Item added successfully'})
});

// UPDATE
router.put('/updateUser/:id', function (req, res) {
    var existAccounts = getAccountData()
    let found = existAccounts.find(function (item) {
        return item.id === parseInt(req.params.id);
    });
    if(found){
    fs.readFile(dataPath, 'utf8', (err, data) => {
        let updated = {
            id: req.body.id,
            name: req.body.name,
            email: req.body.email,
            pwd: req.body.pwd,
            role: req.body.role, 
        };
        let targetIndex = existAccounts.indexOf(found);
        existAccounts.splice(targetIndex,1,updated);
        saveAccountData(existAccounts);
        res.send(`accounts with id ${found.id} has been updated`)
    }, true);
    }
    else{
        res.sendStatus(404);
    }
});

// DELETE
router.delete('/deleteUser/:id', function (req, res) {
    var existAccounts = getAccountData()
    let found = existAccounts.find(function (item) {
        return item.id === parseInt(req.params.id);
    });
    if (found) {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            let targetIndex = existAccounts.indexOf(found);
            existAccounts.splice(targetIndex, 1);
            saveAccountData(existAccounts);
            res.send(`accounts with id ${found.id} has been deleted`)
          }, true);
    }
    else{
        res.sendStatus(404);
    }
});

module.exports = router;