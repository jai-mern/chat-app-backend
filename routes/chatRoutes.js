const express = require('express');
const Message = require('../models/Message');

const router = express.Router();

// Route to get all messages
router.get('/messages', async (req, res) => {
  try {
    const messages = await Message.find();
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Route to post a new message
router.post('/messages', async (req, res) => {
  const { user, message } = req.body;

  const newMessage = new Message({ user, message });

  try {
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
