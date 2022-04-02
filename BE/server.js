const express = require("express");
const server = express();
const port = 8000;
const { User } = require("./models");
const { Contact } = require("./models");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("./verivyToken");
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

// endpoint root
server.get("/", verifyToken, (req, res) => {
  res.send("helo world");
});

// show data user
server.get("/user", async (req, res) => {
  const user = await User.findAll({ include: Contact });
  res.send(user);
});

// login
server.post("/login", async (req, res) => {
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
  const validPassword = await bcrypt.compare(req.body.password, user.password);
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
    console.log(req.header("auth-token"));
  }
});

// register
server.post("/register", async (req, res) => {
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
server.post("/delete/:id", async (req, res) => {
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
server.post("/profile/:id/addContact/", async (req, res) => {
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
server.post("/profile/:id/deleteContact/:name", async (req, res) => {
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
server.post("/profile/:id/updateContact/:id_contact", async (req, res) => {
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

server.listen(port, () => console.log(`server running on port ${port}`));
