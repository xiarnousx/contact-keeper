const express = require("express");
const router = express.Router();

// @route   GET  api/contacts
// @desc    Get All user contacts
// @access  Private
router.post("/", (req, res) => {
  res.json({});
});

// @route   POST  api/contacts
// @desc    Add new contacts
// @access  Private
router.post("/", (req, res) => {
  res.json({});
});

// @route   PUT  api/contacts/:id
// @desc    Update a contacts
// @access  Private
router.put("/:id", (req, res) => {
  res.json({});
});

// @route   DELETE  api/contacts/:id
// @desc    Delete a contacts
// @access  Private
router.delete("/:id", (req, res) => {
  res.json({});
});

module.exports = router;
