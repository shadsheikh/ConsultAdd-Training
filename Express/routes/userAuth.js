const User = require('../models/models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// signup 
async function signup(req, res) {
    try {
        const id = req.body.id;
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
        const role = req.body.role;
        const hashedPassword = await bcrypt.hash(password, 8);

        var u = 0, sp = 0, num = 0;
        for (var i = 0; i < password.length; i++) {
            if (password[i] == '@' || password[i] == '#' || password[i] == '$' || password[i] == '%' || password[i] == '^' || password[i] == '&' || password[i] == '*') {
                sp = 1;
            }
            if (password[i] >= '0' && password[i] <= '9') {
                num = 1;
            }
            if (password[i] >= 'A' && password[i] <= 'Z') {
                u = 1;
            }
        }
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required!" });
        }
        else if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long!" });
        }
        else if (u == 0 || sp == 0 || num == 0) {
            return res.status(400).json({ message: "Password must contain at least one uppercase letter, one number and one special character!" });
        }
        else if (!email.includes('@')) {
            return res.status(400).json({ message: "Please enter a valid email address!" });
        }
        else {
            //create a new user
            const hashedPassword = await bcrypt.hash(password, 8);
            await User.create({
                id: id,
                email: email,
                pwd: hashedPassword,
                name: name,
                role: role
            });
            res.status(201).json({ message: "User created successfully!" });
        }
        // await User.create({
        //     id:id,
        //     name:name,
        //     email:email,
        //     pwd: hashedPassword,
        //     role:role
        // });

        // res.sendStatus(200);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}

async function login(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    // console.log(email);
    // console.log(password);

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).send({ error: 'Invalid login credentials' });
    }
    const ismatch = bcrypt.compareSync(password, user.pwd);
    if (!ismatch) {
        return res.status(400).send({ error: 'Invalid login credentials' });
    }
    // create jwt token
    const exp = Date.now() + (60 * 60 * 1000 * 5);
    const token = jwt.sign({ sub: user._id, exp }, process.env.SECRET_KEY);

    // set the jwt token as a cookie
    res.cookie('Authorisation', token, {
        httpOnly: true,
        sameSite: true,
        expires: new Date(exp),
        secure: process.env.NODE_ENV === 'production'
    });

    res.sendStatus(200);
}
function checkAuth(req, res) {
    console.log(req.user);
    res.sendStatus(200);
}

function logout(req, res) {
    res.clearCookie('authorisation');
    res.sendStatus(200);
}

module.exports = {
    signup,
    login,
    checkAuth,
    logout
};
