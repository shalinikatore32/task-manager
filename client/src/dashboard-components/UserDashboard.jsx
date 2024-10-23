import React from 'react';
import { FaPlus } from 'react-icons/fa'; // Import the plus icon from react-icons
import './userDashboard.css'; // Assuming you have a separate CSS file for styling
import { NavLink } from 'react-router-dom';

function UserDashboard() {
  return (
    <div className="user-dashboard-container">
      {/* Other dashboard content goes here */}
      
      <button className="create-task-button">
        <NavLink to='/dashboard/create-task'><FaPlus /></NavLink>
      </button>
    </div>
  );
}

export default UserDashboard;
