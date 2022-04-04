const router = require("express").Router();
const bcrypt = require("bcrypt");
const verifyToken = require("../middlewares/verivyToken");
const { User } = require("../models");
const { Contact } = require("../models");
const {
  login,
  register,
  deleteAccount,
  profile,
  addContact,
  deleteContact,
  updateContact,
} = require("../controller");
// endpoint root
router.get("/", verifyToken, (req, res) => {
  res.send("helo world");
});

// show data user
router.get("/user", async (req, res) => {
  const user = await User.findAll({ include: Contact });
  res.send(user);
});

// login
router.post("/api/v1/login", login);

// register
router.post("/api/v1/register", register);

// delete account
router.post("/delete/:id",verifyToken ,deleteAccount);

// profile
router.get("/api/v1/user/:id",verifyToken ,profile);



// add contact
router.post("/profile/:id/addContact",verifyToken ,addContact);

// delete contact
router.post("/api/v1/profile/:id/deleteContact/:name",verifyToken ,deleteContact);

// update Contact
router.post("/api/v1/profile/:id/updateContact/:id_contact",verifyToken ,updateContact);

module.exports = router;
