const db = require("../config/database");
const User = db.user;
const { signToken, verifyToken } = require("../utils/tokenHandler");
const dateHandler = require("../utils/dateHandler");

const login = async (req, res) => {
  // validate post body
  // validate email in database
  // validate password
  try {
    const { username, password } = req.body;

    const user = await User.findOne({
      where: { username },
    });

    if (!user) {
      return res.status(401).json({ error: "invalid credentials" });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: "invalid credentials" });
    }

    const token = await signToken({
      userId: user.id,
    });

    res.header("Authorization", `Bearer ${token}`);

    res.status(200).json({
      status: 200,
      user: user.username,
      message: "Authorization success",
    });
  } catch (err) {
    res.status(400).json({
      status: 404,
      message: "bad request",
    });
  }
};

const relogin = async (req, res) => {
  const token = req.body.token;

  if (!token) return res.status(401).json({ message: "unauthorized" });

  const bearerToken = token.split(" ");

  try {
    const verifiedToken = await verifyToken(bearerToken[1]);

    if (!verifiedToken)
      return res.status(200).json({ message: "unauthorized" });

    const { id, username } = await User.findByPk(verifiedToken.userId);

    res.status(200).json({
      user: { id, username },
      token: token,
    });
  } catch (error) {
    res.status(401).json({ error: error, message: "unauthorized" });
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
  relogin,
  register,
};
