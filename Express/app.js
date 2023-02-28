if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require("express")
const routes = require('./routes/route')
const mongoose = require("mongoose");
const userAuth = require('./routes/userAuth');
const operations = require('./routes/operations');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const requireAuth = require('./middleware/requireAuth');
const User = require('./models/models');
const Project = require('./models/project');

const app = express()

app.use(express.json());
app.use(cookieParser());
mongoose.set("strictQuery", false);

const password = "shads123";
const username = "Shads";
const cluster = "cluster0.1kwfpq4";
const dbname = "Database";

var query = 'mongodb+srv://shads:shads123@cluster0.1kwfpq4.mongodb.net/?retryWrites=true&w=majority'
const db = (query);
mongoose.Promise = global.Promise;
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, function (error) {
    if (error) {
        console.log("Error!" + error);
    }
});

app.use('/', routes)

app.post('/signup', userAuth.signup);
app.post('/login', userAuth.login);
app.get('/logout', userAuth.logout);
app.get('/checkAuth', requireAuth, userAuth.checkAuth);
app.post('/createNewProject', requireAuth, operations.createNewProject);


app.listen(3000, () => {
    console.log("listeniing at port:3000")
})