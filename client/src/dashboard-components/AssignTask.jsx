import React, { useState, useEffect } from 'react';
import { Consumer } from '../store-token/UseAuth';

function AssignTask({ taskId }) {
  const [users, setUsers] = useState([]); // Users who can be assigned tasks
  const [selectedUserId, setSelectedUserId] = useState('');
  const {user, authorizedToken} = Consumer();

  useEffect(() => {
    
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5008/users', {
          method:'GET',
          headers: { Authorization: authorizedToken } 
        });
        if(response.ok)
        {
          const data = await response.json();
        setUsers(data);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [authorizedToken]);

  const handleAssign = async () => {
    try {
      const response = await fetch(`http://localhost:5008/assign-task/${taskId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authorizedToken,
        },
        body: JSON.stringify({ userId: selectedUserId }),
      });

      if (response.ok) {
        console.log('Task assigned successfully');
      } else {
        console.error('Error assigning task');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h3>Assign Task</h3>
      <select onChange={(e) => setSelectedUserId(e.target.value)} value={selectedUserId}>
        <option value="" disabled>Select user</option>
        {users.map(user => (
          <option key={user._id} value={user._id}>
            {user.username}
          </option>
        ))}
      </select>
      <button onClick={handleAssign}>Assign</button>
    </div>
  );
}

export default AssignTask;
