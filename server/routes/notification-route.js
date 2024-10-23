const express = require('express');
const notificationRoute = express.Router();
const Task = require('../models/create-task-model');
const authMiddleware = require('../controllers/authMiddleware');
const User = require('../models/user-model'); // Assuming a User model exists
notificationRoute.route('/notifications').get(authMiddleware, async (req, res) => {
    try {
      const userId = req.user._id; // Assuming user ID is available through auth middleware
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(user.notifications);
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve notifications', error });
    }
  });
  
  module.exports=notificationRoute;