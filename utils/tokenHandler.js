const jwt = require("jsonwebtoken");

const signToken = async (payload) => {
  const token = await jwt.sign(payload, process.env.ACCESS_KEY);
  return token;
};

const verifyToken = async (token) => {
  const verifiedToken = await jwt.verify(token, process.env.ACCESS_KEY);
  return verifiedToken;
};

module.exports = {
  verifyToken,
  signToken,
};
