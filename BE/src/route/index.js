const router = require("express").Router();
const bcrypt = require("bcrypt");
const verifyToken = require("../middlewares/verivyToken");
const { User } = require("../models");
const { Contact } = require("../models");
const { login } = require("../controller");
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
router.post("/register", async (req, res) => {
  const body = req.body;

  // enkriptsi password config use bcrypt
  const salt = await bcrypt.genSalt(10);
  // hashing password
  const hashPassword = await bcrypt.hash(body.password, salt);

  const userFound = await User.findOne({
    where: {
      email: body.email,
    },
  });
  if (userFound) {
    // 422 Unprocessed Entity
    res.json({
      status: 422,
      message: "user already to exist",
    });
  } else {
    await User.create({
      username: body.username,
      email: body.email,
      password: hashPassword,
    }).then((user) => {
      // 201 Created!
      res.json({
        status: 201,
        message: "success data created!",
        data: user,
      });
    });
  }
});

// delete account
router.post("/delete/:id", async (req, res) => {
  await User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((user) => {
      res.json({
        status: 200,
        message: "success admin deleted!",
        data: user,
      });
    })
    .catch((err) => {
      res.json({
        status: 400,
        message: "failed to deleted!",
        error: err,
      });
    });
});

// add contact
router.post("/profile/:id/addContact", async (req, res) => {
  // validasi
  const numberFound = await Contact.findOne({
    where: {
      telephone: req.body.telephone,
    },
  });

  const userFound = await Contact.findOne({
    where: {
      name: req.body.name,
    },
  });

  if (numberFound) {
    res.json({
      status: 400,
      message: "number is already in contact",
      found: numberFound,
    });
  } else if (userFound) {
    res.json({
      status: 400,
      message: "user name is already in contact",
      found: userFound,
    });
  } else {
    await Contact.create({
      fk_id: req.params.id,
      name: req.body.name,
      telephone: req.body.telephone,
      address: req.body.address,
      postal_code: req.body.postal_code,
    })
      .then((user) => {
        res.json({
          status: 201,
          message: "Contact Added!",
          data: user,
        });
      })
      .catch((err) => {
        res.json({
          status: 400,
          message: "Failed to add contact",
          error: err,
        });
      });
  }
});

// delete contact
router.post("/profile/:id/deleteContact/:name", async (req, res) => {
  await Contact.destroy({
    where: {
      name: req.params.name,
    },
  })
    .then((user) => {
      res.json({
        status: 200,
        message: "contact deleted!",
        user: user,
      });
    })
    .catch((err) => {
      res.json({
        status: 400,
        message: "failed delete Contact",
        error: err,
      });
    });
});

// update Contact
router.post("/profile/:id/updateContact/:id_contact", async (req, res) => {
  await Contact.update(
    {
      name: req.body.name,
      telephone: req.body.telephone,
      address: req.body.address,
      postal_code: req.body.postal_code,
    },
    {
      where: { id: req.params.id_contact },
    }
  )
    .then((user) => {
      res.json({
        status: 200,
        message: "contact updated!",
        user: user,
      });
    })
    .catch((err) => {
      res.json({
        status: 400,
        message: "failed Update",
        error: err,
      });
    });
});

module.exports = router;
