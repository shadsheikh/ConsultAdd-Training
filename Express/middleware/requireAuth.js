const jwt = require('jsonwebtoken');
const User = require('../models/models');

async function requireAuth(req, res, next) {

    try {
        //read token from cookie
        const token = req.cookies.Authorisation;
        //decode token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        // find user with this token and check if user exists
        const user = await User.findById(decoded.sub);
        if (!user) {
            return res.status(401).send({ error: 'Not authorized to access this resource' });
        }

        req.user = user;

        next();
    }
    catch (error) {
        console.log(error);
        res.sendStatus(401);
    }
}

module.exports = requireAuth;
