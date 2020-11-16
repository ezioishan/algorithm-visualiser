const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5000;
const User = require("./models/User");

const db = require("./config/keys").MongoURI;
mongoose
	.connect(db, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("MongoDB connected..."))
	.catch((err) => console.log(err));

app.use(cors());
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
	bodyParser.urlencoded({
		// to support URL-encoded bodies
		extended: false,
	})
);

app.post("/", (req, res) => {
	console.log("User Registration");
	const { email, password, conf_password } = req.body;
	console.log(req.body);
	User.findOne({ email: email }, (err, user) => {
		console.log("MongoDB data retrieved: ", user);
		if (err) {
			//some error
			console.log("User.js post error: ", err);
		} else if (user) {
			//user already exist
			res.json({
				error: `Sorry, already a user with the email: ${email}`,
			});
		} else {
			//otherwise create a new user
			const newUser = new User({
				email,
				password,
			});
			newUser.save((err, savedUser) => {
				if (err) return res.json(err);
				res.json(savedUser);
			});
		}
	});
});
app.post("/login", (req, res) => {
	console.log("server.js, login, req.body: ");
	console.log(req.body);

	const { email, password } = req.body;
	User.findOne({ email: email, password: password }, (err, user) => {
		console.log("MongoDB data retrieved: ", user);
		if (err) {
			//some error
			console.log("server.js post error: ", err);
		} else if (user) {
			//user already exist
			console.log("User exists!", user);
			var userInfo = {
				email: user.email,
			};
			res.send(userInfo);
		}
	});
});

app.get("/login", (req, res) => {
	console.log("===== user!!======");
	console.log(req.user);
	if (req.user) {
		res.json({ user: req.user });
	} else {
		res.json({ user: null });
	}
});

app.listen(port, () => console.log(`Server running at ${port}`));
