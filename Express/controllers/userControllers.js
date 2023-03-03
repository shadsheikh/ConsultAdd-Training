const userModel = require("../models/models")

// READ
exports.getAllUsers =  async (req, res) => {
    const users = await userModel.find({});
    try {
        res.send(users);
    }catch (error) {
        res.status(500).send(error);
    }
}

//READ By ID
exports.getUser = async (req, res) => {
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
}

// CREATE
exports.createUser = async (req, res) => {
    const user = new userModel(req.body);
    try {
      await user.save();
        res.send(user);
    }catch (error) {
        res.status(500).send(error);
    } 
}

// UPDATE
exports.updateUser = async (req, res) => {
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
}

//DELETE
exports.deleteUser = async (req, res) => {
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
}

exports.formValidation = (req,res,next) => {
    if(!req.body.id && !req.body.name && !req.body.emial && !req.body.pwd &&!req.body.role){
        return res.status(400).json({
            status: 'fail',
            message: 'Missing required parameters'
        })
    }
    next();
}