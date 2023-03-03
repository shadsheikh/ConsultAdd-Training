const express = require("express")
const userRouter = require('./routes/userRoutes')
const mongoose = require("mongoose");

const app = express()

app.use(express.json());
mongoose.set("strictQuery", false);

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

app.use('/users', userRouter)

module.exports = app