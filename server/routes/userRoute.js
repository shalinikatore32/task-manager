const express = require('express');
const fetchUserRoute = express.Router();
const User = require('../models/user-model'); // Import your User model
const authMiddleware = require('../controllers/authMiddleware'); // Import your authorization middleware if needed

// Fetch all users
fetchUserRoute.get('/users', authMiddleware, async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find({}, '_id username email'); // Adjust fields as needed
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Error fetching users' });
  }
});

module.exports = fetchUserRoute;
