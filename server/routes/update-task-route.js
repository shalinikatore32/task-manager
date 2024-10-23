// routes/taskRoutes.js

const express = require('express');
const updateRoute = express.Router();
const Task = require('../models/create-task-model'); // Assuming your Task model is defined in models/Task.js

// Update a task by ID
updateRoute.put('/update/task/:id', async (req, res) => {
  const { title, description } = req.body; // Extract the fields to update

  try {
    const taskId = req.params.id;
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { title, description },
      { new: true } // Option to return the updated document
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'An error occurred while updating the task' });
  }
});

module.exports = updateRoute;
