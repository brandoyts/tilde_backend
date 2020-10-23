require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodeGeoCoder = require("node-geocoder");
const app = express();
const dashboardRoutes = require("./routes/api/dashboard");
const authenticateRoutes = require("./routes/api/authenticate");

// const geoCoderOptions = {
// 	provider: "here",
// 	apiKey: process.env.MAP_API_KEY,
// };

// const geoCoder = nodeGeoCoder(geoCoderOptions);

// geoCoder
// 	.geocode("Sauyo")
// 	.then((res) => {
// 		console.log(res);
// 	})
// 	.catch((err) => {
// 		console.log(err);
// 	});

const corsOptions = {
	exposedHeaders: "Authorization",
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/authenticate", authenticateRoutes);
