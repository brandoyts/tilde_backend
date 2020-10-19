const db = require("../config/database");
const User = db.user;
const { signToken } = require("../utils/tokenHandler");

const login = async (req, res) => {
	// validate post body
	// validate email in database
	// validate password
	try {
		const { email, password } = req.body;

		const user = await User.findOne({
			where: { email },
		});

		if (!user) {
			return res.status(401).json({ message: "invalid credentials" });
		}

		if (user.password !== password) {
			return res.status(401).json({ message: "invalid credentials" });
		}

		const token = await signToken({
			userId: user.id,
		});

		res.header("X-Access-Token", `Bearer ${token}`);
		res.status(200).json({
			message: "authenticated",
		});
	} catch (err) {
		res.status(401).json({
			message: "unauthorized",
		});
	}
};

const register = async (req, res) => {
	try {
		const { username, email, password } = req.body;

		const user = await User.create({
			username,
			email,
			password,
		});
		console.log(user);
		res.status(201).json({
			message: "register successful",
			user,
		});
	} catch (err) {
		res.status(400).json({
			message: err,
		});
	}
};

module.exports = {
	login,
	register,
};
