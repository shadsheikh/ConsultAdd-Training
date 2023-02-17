const express = require("express");
const mongoose = require("mongoose");
const Router = require("./routes")

const app = express();

app.use(express.json());
mongoose.set("strictQuery", false);


const password = "";
const username = "";
const cluster = "";
const dbname = "myFirstDatabase";

var query =
    `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`

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

app.use(Router);

app.listen(3000, () => {
    console.log("Server is running at port 3000");
});