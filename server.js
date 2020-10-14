require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodeGeoCoder = require("node-geocoder");
const app = express();
const auth = require("./middlewares/auth");
const { signToken } = require("./utils/tokenHandler");
const fakeUser = {
	id: "1",
	username: "brando",
	password: "1234",
};

const geoCoderOptions = {
	provider: "here",
	apiKey: process.env.MAP_API_KEY,
};

const geoCoder = nodeGeoCoder(geoCoderOptions);

geoCoder
	.geocode("Sauyo")
	.then((res) => {
		console.log(res);
	})
	.catch((err) => {
		console.log(err);
	});

const corsOptions = {
	exposedHeaders: "Authorization",
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
	res.send("test");
});

// AUTHENTICATE USER ON LOGIN
app.post("/authenticate-user", async (req, res) => {
	const { username, password } = req.body;

	if (username === fakeUser.username && password === fakeUser.password) {
		const user = fakeUser;

		const token = await signToken(user);

		res.header("X-Access-Token", `Bearer ${token}`);
		res.status(200).json({
			message: "login success",
			token,
		});
	} else {
		res.status(401).json({
			message: "unauthorize",
		});
	}
});

// PROTECTED ROUTE
// REGISTER A GUEST
app.post("/add-guest", auth, (req, res) => {
	res.send("/add-guest protected");
});
