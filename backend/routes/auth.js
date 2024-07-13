const express = require("express");
const router = express.Router();

// @route   GET  api/auth
// @desc    Get logged In User
// @access  Private
router.get("/", (req, res) => {
  res.json({});
});

// @route   POST  api/auth
// @desc    Log In a User and get token
// @access  Public
router.post("/", (req, res) => {
  res.json({});
});

module.exports = router;
