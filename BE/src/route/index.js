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
router.get("/user", verifyToken, async (req, res) => {
  const user = await User.findAll({ include: Contact });
  res.send(user);
});

// login
router.post("/login", login);

// register
router.post("/register", register);

// delete account
router.post("/delete/:id", deleteAccount);

// profile
router.get("/user/:id", profile);

// add contact
router.post("/profile/:id/addContact", addContact);

// delete contact
router.post("/profile/:id/deleteContact/:name", deleteContact);

// update Contact
router.post("/profile/:id/updateContact/:id_contact", updateContact);

module.exports = router;
