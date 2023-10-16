const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
    });
    res.json("SUCCESS");
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await Users.findOne({ where: { username: username } });

  if (!user) {
    return res.json({ error: "User Doesn't Exist" });
  }

  bcrypt.compare(password, user.password).then((match) => {
    console.log("MATCH: ", match);

    if (!match) {
      return res.json({ error: "Wrong Username And Password Combination" });
    }
    const accessToken = sign(
      { username: user.username, id: user.id },
      "importantsecret"
    );
    return res.json({ token: accessToken, username: username, id: user.id });
  });
});

// Check if there is a user or not
router.get("/auth", validateToken, (req, res) => {
  res.json(req.user);
});

router.get("/userinfo/:id", async (req, res) => {
  const id = req.params.id;
  const userInfo = await Users.findByPk(id, {
    attributes: { exclude: ["password"] },
  });
  res.json(userInfo);
});

router.put("/changepassword", validateToken, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await Users.findOne({ where: { username: req.user.username } });

  bcrypt.compare(oldPassword, user.password).then(async (match) => {
    if (!match) res.json({ error: "Wrong Old Password Entered!" });

    bcrypt.hash(newPassword, 10).then((hash) => {
      Users.update(
        { password: hash },
        { where: { username: req.user.username } }
      ); 
      res.json("SUCCESS");
    });
  });
});

module.exports = router;
