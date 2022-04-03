const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token)
    return res.json({
      status: 400,
      message: "access danied!",
    });
  try {
    const verified = jwt.verify(token, "THIS_IS_SECRET_KEY");
    req.user = verified;
    next();
  } catch (error) {
    res.json({
      status: 400,
      message: "Invalid Token!",
    });
  }
};

module.exports = verifyToken;
