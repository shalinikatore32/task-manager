// routes/taskRoutes.js

const express = require('express');
const deleteRoute = express.Router();
const Task = require('../models/create-task-model'); // Assuming your Task model is defined in models/Task.js

// Delete a task by ID
deleteRoute.delete('/delete/task/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'An error occurred while deleting the task' });
  }
});

module.exports = deleteRoute;
