import React, { useState, useEffect } from 'react';
import { Consumer } from '../store-token/UseAuth';
import './notifications.css'; // Import the CSS

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const { user, authorizedToken } = Consumer();

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(`http://localhost:5008/notifications/${user._id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: authorizedToken,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setNotifications(data.notifications);
        } else {
          console.error('Error fetching notifications:', data.message);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    if (user) {
      fetchNotifications();
    }
  }, [user, authorizedToken]);

  return (
    <div className="notifications-container">
      <h2>Notifications</h2>
      {notifications.length > 0 ? (
        <ul>
          {notifications.map((notification) => (
            <li key={notification._id} className="notification-item">
              <span className="notification-message">
                {notification.message} {/* Customize this field */}
              </span>
              <span className="notification-time">
                {new Date(notification.timestamp).toLocaleString()} {/* Adjust timestamp */}
              </span>
              <div className="notification-actions">
                {/* Add action buttons here if necessary */}
                {notification.type === 'invitation' && (
                  <button >
                    Accept Invitation
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-notifications">No notifications available</p>
      )}
    </div>
  );
}

export default Notifications;
