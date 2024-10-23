import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './viewTask.css'; // Import your CSS file

// Sample task data
const sampleTasks = [
  { id: 1, title: 'Task 1', description: 'Description for Task 1', createdAt: '2024-08-10', startDate: '2024-08-01', dueDate: '2024-08-15' },
  { id: 2, title: 'Task 2', description: 'Description for Task 2', createdAt: '2024-08-09', startDate: '2024-08-02', dueDate: '2024-08-12' },
  { id: 3, title: 'Task 3', description: 'Description for Task 3', createdAt: '2024-08-08', startDate: '2024-08-05', dueDate: '2024-08-20' },
  { id: 1, title: 'Task 1', description: 'Description for Task 1', createdAt: '2024-08-10', startDate: '2024-08-01', dueDate: '2024-08-15' },
  { id: 2, title: 'Task 2', description: 'Description for Task 2', createdAt: '2024-08-09', startDate: '2024-08-02', dueDate: '2024-08-12' },
  { id: 3, title: 'Task 3', description: 'Description for Task 3', createdAt: '2024-08-08', startDate: '2024-08-05', dueDate: '2024-08-20' },
  { id: 1, title: 'Task 1', description: 'Description for Task 1', createdAt: '2024-08-10', startDate: '2024-08-01', dueDate: '2024-08-15' },
  { id: 2, title: 'Task 2', description: 'Description for Task 2', createdAt: '2024-08-09', startDate: '2024-08-02', dueDate: '2024-08-12' },
  { id: 3, title: 'Task 3', description: 'Description for Task 3', createdAt: '2024-08-08', startDate: '2024-08-05', dueDate: '2024-08-20' },
  { id: 1, title: 'Task 1', description: 'Description for Task 1', createdAt: '2024-08-10', startDate: '2024-08-01', dueDate: '2024-08-15' },
  { id: 2, title: 'Task 2', description: 'Description for Task 2', createdAt: '2024-08-09', startDate: '2024-08-02', dueDate: '2024-08-12' },
  { id: 3, title: 'Task 3', description: 'Description for Task 3', createdAt: '2024-08-08', startDate: '2024-08-05', dueDate: '2024-08-20' },
  { id: 1, title: 'Task 1', description: 'Description for Task 1', createdAt: '2024-08-10', startDate: '2024-08-01', dueDate: '2024-08-15' },
  { id: 2, title: 'Task 2', description: 'Description for Task 2', createdAt: '2024-08-09', startDate: '2024-08-02', dueDate: '2024-08-12' },
  { id: 3, title: 'Task 3', description: 'Description for Task 3', createdAt: '2024-08-08', startDate: '2024-08-05', dueDate: '2024-08-20' },
];

function ViewTask() {
  const { id } = useParams(); // Get task ID from URL params
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch task data based on ID
    const fetchedTasks = sampleTasks; // Replace with actual fetch call
    setTasks(fetchedTasks);
  }, []);

  const handleBack = () => {
    navigate('/manage-tasks'); // Redirect to the manage tasks page
  };

  return (
    <div className="view-task-container">
      <h2>View Tasks</h2>
      <div className="task-cards">
        {tasks.map((task) => (
          <div className="task-card" key={task.id}>
            <h3>{task.title}</h3>
            <p><strong>Description:</strong> {task.description}</p>
            <p><strong>Created At:</strong> {task.createdAt}</p>
            <p><strong>Start Date:</strong> {task.startDate}</p>
            <p><strong>Due Date:</strong> {task.dueDate}</p>
          </div>
        ))}
      </div>
      <button onClick={handleBack} className="back-button">Back to Task List</button>
    </div>
  );
}

export default ViewTask;
