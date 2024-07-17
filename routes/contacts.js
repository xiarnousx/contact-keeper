const express = require("express");
const { check, validationResult } = require("express-validator");
const authMiddleware = require("../middleware/auth");
const User = require("../models/User");
const Contact = require("../models/Contact");

const router = express.Router();

// @route   GET  api/contacts
// @desc    Get All user contacts
// @access  Private
router.get("/", authMiddleware, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1,
    });
    return res.json(contacts);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error!");
  }
});

const contactValidation = [check("name", "Name is required").not().isEmpty()];
// @route   POST  api/contacts
// @desc    Add new contacts
// @access  Private
router.post("/", [authMiddleware, contactValidation], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, phone, type } = req.body;

  try {
    const contact = new Contact({
      name,
      email,
      phone,
      type,
      user: req.user.id,
    });
    await contact.save();
    return res.json(contact);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
});

// @route   PUT  api/contacts/:id
// @desc    Update a contacts
// @access  Private
router.put("/:id", [authMiddleware, contactValidation], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, phone, type } = req.body;

  try {
    const toUpdate = {};
    if (name) toUpdate.name = name;
    if (email) toUpdate.email = email;
    if (phone) toUpdate.phone = phone;
    if (type) toUpdate.type = type;

    let contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ msg: "Contact not found" });
    }
    // Make sure contact belongs to user
    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not Authorized" });
    }
    contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { $set: toUpdate },
      { new: true }
    );
    return res.json(contact);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error");
  }
});

// @route   DELETE  api/contacts/:id
// @desc    Delete a contacts
// @access  Private
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(401).json({ msg: "Not Authorized" });
    }

    if (contact.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not Authorized" });
    }
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ msg: "Contact removed!" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send("Server Error!");
  }
});

module.exports = router;
