import React, { useState, useEffect } from 'react';
import { Navigate, NavLink, Outlet, useNavigate } from 'react-router-dom';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import './dashboard.css';
import { Consumer } from '../store-token/UseAuth';


function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const { user, isLoggedin, authorizedToken } = Consumer();
  const navigate = useNavigate();

  // Sidebar toggle
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Profile menu toggle
  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
   
  };

 

  // Handle accepting an invitation
  const handleAcceptInvitation = async (teamId) => {
    try {
      const response = await fetch(`http://localhost:5008/accept-invitation/${teamId}/${user._id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authorizedToken,
        },
      });
      const data = await response.json();
      if (response.ok) {
        // Remove the accepted invitation from notifications
        setNotifications(notifications.filter((notification) => notification.teamId !== teamId));
      } else {
        console.error('Error accepting invitation:', data.message);
      }
    } catch (error) {
      console.error('Error accepting invitation:', error);
    }
  };

  // Redirect to login if not logged in or user object is not available
  if (!isLoggedin || !user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className={`user-dashboard-container ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <header className="dashboard-header">
        <div className="logo">Logo</div>
        <div className="user-profile" onClick={toggleProfileMenu}>
          <AccountCircleIcon className="profile-icon" />
          <span>{`${user.fname} ${user.lname}`}</span>
          {isProfileMenuOpen && (
            <div className="profile-menu">
              <NavLink to="/profile-settings">Profile Settings</NavLink>

              <NavLink to="/dashboard/notifications">Notifications</NavLink>

              <NavLink to="/logout">Logout</NavLink>
            </div>
          )}
        </div>
      </header>

      <div className={`user-container ${isSidebarOpen ? 'open' : 'closed'}`}>
        <nav>
          <ul>
            <li>
              <NavLink to="/dashboard/user-dashboard">
                <DashboardOutlinedIcon />
                {isSidebarOpen && <span>Dashboard</span>}
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/create-team">
                <CreateOutlinedIcon />
                {isSidebarOpen && <span>Create Team</span>}
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/create-task">
                <CreateOutlinedIcon />
                {isSidebarOpen && <span>Create Task</span>}
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/manage-task">
                <ManageAccountsOutlinedIcon />
                {isSidebarOpen && <span>Manage Task</span>}
              </NavLink>
            </li>
            <li>
              <NavLink to="/logout">
                <LogoutIcon />
                {isSidebarOpen && <span>Logout</span>}
              </NavLink>
            </li>
          </ul>
          {/* Assign Task Button */}
          <div className="assign-task-button-container">
            <button className="assign-task-button">
              <NavLink to="/dashboard/assign-task">Assign Task</NavLink>
            </button>
          </div>
        </nav>
      </div>

      <div className="user-content">
        <button className="user-toggle-button" onClick={toggleSidebar}>
          <MenuIcon />
        </button>
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
