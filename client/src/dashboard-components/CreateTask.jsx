import React, { useState } from 'react';
import './createTask.css'; // Import your CSS file
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Consumer } from '../store-token/UseAuth';

function CreateTask() {
  const navigate = useNavigate();

  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [dueDate, setDueDate] = useState('');

  const { authorizedToken, user } = Consumer();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Extract the user ID from the authenticated user
    const userId = user._id;

    // Create the task object to send as JSON
    const taskData = {
      userId,
      title: taskTitle,
      description: taskDescription,
      startDate,
      dueDate
    };

    try {
     
      const response = await fetch('http://localhost:5008/create-task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authorizedToken,
        },
        body: JSON.stringify(taskData),
      })

      const data = await response.json();

      if (response.ok) {
        console.log('Task Created:', data);
        toast.success('Task created successfully');
        navigate('/dashboard/view-task');
      } else {
        toast.error('Error creating task');
      }

      // Check if the due date is approaching
      const today = new Date();
      const due = new Date(dueDate);
      const timeDiff = due.getTime() - today.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

      if (daysDiff <= 3) {
        alert('Reminder: Your task is due soon!');
      }

      // Clear the form after successful task creation
      setTaskTitle('');
      setTaskDescription('');
      setStartDate('');
      setDueDate('');

    } catch (error) {
      console.error('Error creating task:', error);
      toast.error('Error creating task');
    }
  };

  return (
    <div className="create-task-container">
      <h2>Create a New Task</h2>
      <form onSubmit={handleSubmit} className="create-task-form">
        <div className="form-group">
          <label htmlFor="task-title">Task Title</label>
          <input
            type="text"
            id="task-title"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder="Enter task title"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="task-description">Task Description</label>
          <textarea
            id="task-description"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            placeholder="Enter task description"
            rows="4"
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="start-date">Start Date</label>
          <input
            type="date"
            id="start-date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="due-date">Due Date</label>
          <input
            type="date"
            id="due-date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">Create Task</button>
      </form>
    </div>
  );
}

export default CreateTask;
