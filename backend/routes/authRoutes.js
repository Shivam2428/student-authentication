const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../models/Student");
const auth = require("../middleware/authMiddleware");

// REGISTER
router.post("/register", async (req, res) => {
  const { name, email, password, course } = req.body;

  try {
    const user = await Student.findOne({ email });
    if (user) return res.status(400).json({ msg: "Email already exists" });

    const hash = await bcrypt.hash(password, 10);

    const newUser = new Student({
      name,
      email,
      password: hash,
      course
    });

    await newUser.save();
    res.json({ msg: "Registered successfully" });

  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Student.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid email" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    const userData = await Student.findById(user._id).select("-password");

    res.json({ token, user: userData });

  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE COURSE
router.put("/update-course", auth, async (req, res) => {
  const { course } = req.body;

  try {
    const user = await Student.findByIdAndUpdate(
      req.user.id,
      { course },
      { new: true }
    ).select("-password");

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE PASSWORD
router.put("/update-password", auth, async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await Student.findById(req.user.id);

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Wrong old password" });

    const hash = await bcrypt.hash(newPassword, 10);
    user.password = hash;

    await user.save();

    res.json({ msg: "Password updated" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;