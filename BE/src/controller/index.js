const { User } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
module.exports = {
  login: async (req, res) => {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!user) {
      // 404 Not Found
      res.json({
        status: 404,
        message: "user not found!",
      });
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      res.json({
        status: 400,
        message: "Wrong password!",
      });
    } else {
      const token = jwt.sign({ id: user.id }, "THIS_IS_SECRET_KEY");
      res
        .header("auth-token", token)
        // 200 success
        .json({
          status: 200,
          message: "anda berhasil login",
          accessToken: token,
        });
    }
  },
};
