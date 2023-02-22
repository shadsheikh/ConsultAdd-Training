const express = require("express")
const userModel = require("../models/models")
const router = express.Router();
const {checkSchema} = require('express-validator')


// READ
router.get('/getUser', async (req, res) => {
    const users = await userModel.find({});
    try {
        res.send(users);
    }catch (error) {
        res.status(500).send(error);
    }
});

//READ By ID
router.get('/getUserById/:id', async (req, res) => {
    const users = await userModel.find({});
    let found = users.find(function (item) {
        return item.id === parseInt(req.params.id);
    });
    if(found){
        res.send(found)
    }
    else{
        res.sendStatus(404);
    }
 });

 const createSchema = {
    id: {
        notEmpty: true,
        errorMessage: "ID cannot be empty"
    },
    name: {
        custom: {
            options: value => {
                return User.find({
                    username: value
                }).then(user => {
                    if (user.length > 0) {
                        return Promise.reject('Name already in use')
                    }
                })
            }
        }
    },
    email: {
        normalizeEmail: true,
        custom: {
            options: value => {
                return User.find({
                    email: value
                }).then(user => {
                    if (user.length > 0) {
                        return Promise.reject('Email address already taken')
                    }
                })
            }
        }
    },
    pwd: {
        isStrongPassword: {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1
        },
        errorMessage: "Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number",
    },
    role: {
        notEmpty: true,
        errorMessage: "Role cannot be empty"
    }
}

// CREATE
router.post('/addUser', checkSchema(createSchema), async (req, res) => {
    const user = new userModel(req.body);
    try {
      await user.save();
        res.send(user);
    }catch (error) {
        res.status(500).send(error);
    } 
});

// UPDATE
router.put('/updateUser/:id', async (req, res) => {
    const users = await userModel.find({});
        let found = users.find(function (item) {
            return item.id === parseInt(req.params.id);
        });
        if(found){
            let updated = {
                id: req.body.id,
                name: req.body.name,
                email: req.body.email,
                pwd: req.body.pwd,
                role: req.body.role, 
            };
            let targetIndex = users.indexOf(found);
            users.splice(targetIndex,1,updated);
            const newuser = new userModel((users));
            newuser.save();
            res.send(`accounts with id ${found.id} has been updated`)
    }else{
        res.sendStatus(404);
    }
});

//DELETE
router.delete('/deleteUser/:id', async (req, res) => {
    const users = new userModel(req.body);
    let found = users.find(function (item) {
        return item.id === parseInt(req.params.id);
    });
    if (found) {
            let targetIndex = users.indexOf(found);
            users.splice(targetIndex,1);
        users.save(function(){});
            res.send(`accounts with id ${found.id} has been deleted`)
    }
    else{
        res.sendStatus(404);
    }
});

module.exports = router;