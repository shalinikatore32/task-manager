const express = require('express');
const multer = require('multer'); // For handling file uploads
const path = require('path');
const taskRoute = express.Router();
const Task = require('../models/create-task-model');
const authMiddleware = require('../controllers/authMiddleware');



// Handle task creation with file upload
taskRoute.route('/create-task').post(authMiddleware,  async (req, res) => {
  try {
    const { userId, title, description, startDate, dueDate,status,assignedTo,team} = req.body;
    

    // Create a new task with additional fields
    const newTask = new Task({
      userId,
      title,
      description,
      startDate,
      dueDate,
      status,assignedTo,team,
      
    });

    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create task', error });
  }
});

module.exports = taskRoute;
