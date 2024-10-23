import React, { useState, useEffect } from 'react';
import './manageTask.css'; // Import your CSS file
import { Consumer } from '../store-token/UseAuth';
import { toast } from 'react-toastify';

function ManageTask() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState({ title: '', description: '', _id: '' });
  const { user, authorizedToken } = Consumer();

  // Fetch all tasks
  const getAllTasks = async () => {
    try {
      const response = await fetch(`http://localhost:5008/fetch/user/task/${user._id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authorizedToken,
        },
      });

      const response_data = await response.json();

      if (response.ok) {
        toast.success("Tasks fetched successfully");
        setTasks(response_data);
      } else {
        toast.error("Failed to fetch tasks");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      toast.error("Error occurred while fetching tasks");
    }
  };

  // Delete a task
  const deleteTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:5008/delete/task/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authorizedToken,
        },
      });

      const response_data = await response.json();

      if (response.ok) {
        toast.success(response_data.message);
        setTasks(tasks.filter(task => task._id !== taskId));
      } else {
        toast.error(response_data.message || "Failed to delete task");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      toast.error("Error occurred while deleting task");
    }
  };

  // Open modal for editing
  const openModal = (task) => {
    setCurrentTask(task);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Update a task
  const updateTask = async () => {
    try {
      const response = await fetch(`http://localhost:5008/update/task/${currentTask._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authorizedToken,
        },
        body: JSON.stringify({ title: currentTask.title, description: currentTask.description }),
      });

      const response_data = await response.json();

      if (response.ok) {
        toast.success(response_data.message);
        setTasks(tasks.map(task => task._id === currentTask._id ? response_data.task : task));
        closeModal();
      } else {
        toast.error(response_data.message || "Failed to update task");
      }
    } catch (error) {
      console.error("Error occurred:", error);
      toast.error("Error occurred while updating task");
    }
  };

  useEffect(() => {
    getAllTasks();
  }, [user, authorizedToken]);

  return (
    <div className="manage-task-container">
      <h2>Manage Tasks</h2>
      {tasks.length > 0 ? (
        <div className="task-cards">
          {tasks.map((task) => (
            <div key={task._id} className="task-card">
              <h3 className="task-title">{task.title}</h3>
              <p className="task-description">{task.description}</p>
              <p className="task-date"><strong>Start Date:</strong> {task.startDate}</p>
              <p className="task-date"><strong>Due Date:</strong> {task.dueDate}</p>
              <div className="task-actions">
                <button className="edit-button" onClick={() => openModal(task)}>Edit</button>
                <button className="delete-button" onClick={() => deleteTask(task._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h1>No task created</h1>
      )}

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Edit Task</h3>
            <input
              type="text"
              value={currentTask.title}
              onChange={(e) => setCurrentTask({ ...currentTask, title: e.target.value })}
              placeholder="Title"
            />
            <textarea
              value={currentTask.description}
              onChange={(e) => setCurrentTask({ ...currentTask, description: e.target.value })}
              placeholder="Description"
            />
            <button className="save-button" onClick={updateTask}>Save</button>
            <button className="cancel-button" onClick={closeModal}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageTask;
