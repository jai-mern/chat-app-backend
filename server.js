require('dotenv').config(); // Load environment variables

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const Message = require('./models/Message'); // Import Message model

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.post('/messages', async (req, res) => {
  try {
    const { user, message } = req.body;
    if (!user || !message) {
      return res.status(400).json({ error: 'User and message are required' });
    }
    const newMessage = new Message({ user, message });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
