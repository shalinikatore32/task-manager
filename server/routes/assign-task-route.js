const express = require('express');
const assignRoute = express.Router();
const Task = require('../models/create-task-model');
const authMiddleware = require('../controllers/authMiddleware');
const User = require('../models/user-model'); // Assuming a User model exists

// Route to assign a task
assignRoute.route('/assign-task/:taskId').post(authMiddleware, async (req, res) => {
  try {
    const { userId } = req.body; // The ID of the user being assigned the task
    const { taskId } = req.params;

    // Find the task and add the user to the 'assignedTo' field
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { $push: { assignedTo: userId } },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Notify the user that they have been assigned a task
    await User.findByIdAndUpdate(userId, {
      $push: {
        notifications: {
          message: `You have been assigned to the task: ${updatedTask.title}`,
        }
      }
    });

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Failed to assign task', error });
  }
});

module.exports = assignRoute;
