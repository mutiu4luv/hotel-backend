const express = require("express");

const router = express.Router();
const User = require("../models/userModel");

router.post("/register", async (req, res) => {
  const newuser = new User(req.body);

  try {
    const user = await newuser.save();
    res.send("user registered successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email, password: password });
    if (user) {
      const temp = {
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        _id: user._id,
      };

      res.send(temp);
    } else {
      return res.status(400).json({ message: "Login Failed" });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/getallusers", async (req, res) => {
  try {
    const users = await User.find({});
    res.send({ users });
  } catch (error) {
    return res.status(400).json({ message: "error" });
  }
});

router.delete("/deletes/:id", async (req, res) => {
  try {
    const room = await User.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "USER has been deleted" });
  } catch (error) {
    res.status(500).json("cannot delete user");
  }
});

module.exports = router;
