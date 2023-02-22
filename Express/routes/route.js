const express = require("express")
const userModel = require("../models/models")
const router = express.Router();

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

// CREATE
router.post('/addUser', async (req, res) => {
    const user = new userModel(req.body);
    try {
      await user.save();
        res.send(user);
    } catch (error) {
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

// DELETE
// router.delete('/deleteUser/:id', async (req, res) => {
//     const users = new userModel(req.body);
//     let found = users.find(function (item) {
//         return item.id === parseInt(req.params.id);
//     });
//     if (found) {
//             let targetIndex = users.indexOf(found);
//             users.splice(targetIndex,1);
//         users.save(function(){});
//             res.send(`accounts with id ${found.id} has been deleted`)
//     }
//     else{
//         res.sendStatus(404);
//     }
// });

module.exports = router;