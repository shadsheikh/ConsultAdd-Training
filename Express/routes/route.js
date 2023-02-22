const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");
const { checkSchema } = require("express-validator");

const jwtSecret = require("../helpers/jwtSecret");
const passport = require("../helpers/passport");
const userModel = require("../models/models");

const createSchema = {
	id: {
		notEmpty: true,
		errorMessage: "ID cannot be empty",
	},
	name: {
		custom: {
			options: (value) => {
				return User.find({
					username: value,
				}).then((user) => {
					if (user.length > 0) {
						return Promise.reject("Name already in use");
					}
				});
			},
		},
	},
	email: {
		normalizeEmail: true,
		custom: {
			options: (value) => {
				return User.find({
					email: value,
				}).then((user) => {
					if (user.length > 0) {
						return Promise.reject("Email address already taken");
					}
				});
			},
		},
	},
	pwd: {
		isStrongPassword: {
			minLength: 8,
			minLowercase: 1,
			minUppercase: 1,
			minNumbers: 1,
		},
		errorMessage:
			"Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number",
	},
	role: {
		notEmpty: true,
		errorMessage: "Role cannot be empty",
	},
};

// READ
router.get("/getUser", async (req, res) => {
	const users = await userModel.find({});
	try {
		res.send(users);
	} catch (error) {
		res.status(500).send(error);
	}
});

//READ By ID
router.get("/getUserById/:id", async (req, res) => {
	const users = await userModel.find({});
	let found = users.find(function (item) {
		return item.id === parseInt(req.params.id);
	});
	if (found) {
		res.send(found);
	} else {
		res.sendStatus(404);
	}
});

// CREATE
router.post("/addUser", checkSchema(createSchema), async (req, res) => {
	const user = new userModel(req.body);
	try {
		await user.save();
		res.send(user);
	} catch (error) {
		res.status(500).send(error);
	}
});

// UPDATE
router.put("/updateUser/:id", async (req, res) => {
	const users = await userModel.find({});
	let found = users.find(function (item) {
		return item.id === parseInt(req.params.id);
	});
	if (found) {
		let updated = {
			id: req.body.id,
			name: req.body.name,
			email: req.body.email,
			pwd: req.body.pwd,
			role: req.body.role,
		};
		let targetIndex = users.indexOf(found);
		users.splice(targetIndex, 1, updated);
		const newuser = new userModel(users);
		newuser.save();
		res.send(`accounts with id ${found.id} has been updated`);
	} else {
		res.sendStatus(404);
	}
});

router.delete("/deleteUser/:id", async (req, res) => {
	const users = new userModel(req.body);
	let found = users.find(function (item) {
		return item.id === parseInt(req.params.id);
	});
	if (found) {
		let targetIndex = users.indexOf(found);
		users.splice(targetIndex, 1);
		users.save(function () {});
		res.send(`accounts with id ${found.id} has been deleted`);
	} else {
		res.sendStatus(404);
	}
});

// ---- AUTH ROUTES ----
// Register
router.post("/register", async (req, res, next) => {
	const { id, name, email, pwd, role } = req.body;
	try {
		// Check if fields are empty
		if (!id || !name || !email || !pwd || !role)
			return res.status(400).send({ message: "Fields cannot be empty." });

		// Check if user already exists
		const isUser = await userModel.findOne({ email });
		if (isUser)
			return res
				.status(400)
				.send({ message: "Account with email already exists!" });

		// Create user
		const user = new userModel({ id, name, email, pwd, role });

		// Save user to db
		await user.save();

		// Sign JWT
		const token = await jwt.sign(
			{
				id: user.id,
				email,
				role: user.role,
			},
			jwtSecret,
			{ expiresIn: "1 day" },
		);
		return res.status(201).send({
			status: true,
			code: 201,
			data: user,
			accessToken: token,
		});
	} catch (error) {
		res.sendStatus(404);
	}
});

// Login
router.post("/login", async (req, res, next) => {
	const { email, pwd } = req.body;
	try {
		// Check if fields are empty
		if (!email || !pwd)
			return res.status(400).send({ message: "Fields cannot be empty." });

		// Fetch user and check if they exist
		const user = await userModel.findOne({ email });
		if (user === null)
			return res.status(404).send({ message: "User not found." });

		// Validate password
		if (pwd === user.pwd) {
			// Sign token
			const token = await jwt.sign(
				{
					_id: user._id,
					email,
					role: user.role,
				},
				jwtSecret,
				{ expiresIn: "1 day" },
			);
			return res.status(201).send({
				status: true,
				code: 200,
				data: user,
				accessToken: token,
			});
		}
		return res.status(400).send({
			message: "Password or email incorrect.",
		});
	} catch (error) {
		res.sendStatus(404);
	}
});

// PROTECTED ROUTE
router.get(
	"/protected",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const token = req.headers.authorization.split(" ")[1];
		const tokenData = jwt_decode(token);
		// Send token data as response
		res.json(tokenData);
	},
);

module.exports = router;
