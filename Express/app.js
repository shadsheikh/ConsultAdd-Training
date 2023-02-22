const express = require("express");
const routes = require("./routes/route");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();

dotenv.config();
app.use(express.json());
mongoose.set("strictQuery", false);

const password = "shads123";
const username = "Shads";
const cluster = "cluster0.1kwfpq4";
const dbname = "Database";

var query =
	// `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`
	"mongodb+srv://shads:shads123@cluster0.1kwfpq4.mongodb.net/?retryWrites=true&w=majority";
const db = query;
mongoose.Promise = global.Promise;
mongoose.connect(
	db,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	function (error) {
		if (error) {
			console.log("Error!" + error);
		}
	},
);

app.use("/", routes);

app.listen(3000, () => {
	console.log("listeniing at port:3000");
});
