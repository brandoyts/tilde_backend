const { verifyToken } = require("../utils/tokenHandler");

const auth = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  // CHECK HEADER
  if (!authHeader) return res.status(401).json({ message: "access denied" });

  const token = authHeader.split(" ");

  // CHECK BEARER
  if (token[0] !== "Bearer")
    return res.status(401).json({ message: "access denied" });

  const verifiedToken = await verifyToken(token[1]);

  // CHECK IF TOKEN IS INVALID
  if (!verifiedToken) return res.status(401).json({ message: "access denied" });

  req.userId = verifiedToken.userId;
  next();
};

module.exports = auth;
