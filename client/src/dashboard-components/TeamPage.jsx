import React, { useState, useEffect, useContext } from 'react';
import { Consumer } from '../store-token/UseAuth'; // Assuming you have AuthContext for user state
import './team.css';
import { toast } from 'react-toastify';
import Modal from './Modal'; // Import your custom Modal component

const TeamPage = () => {
  const [teamName, setTeamName] = useState('');
  const [teams, setTeams] = useState([]);
  const [inviteEmail, setInviteEmail] = useState('');
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const { user, authorizedToken } = Consumer();

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch('http://localhost:5008/fetch-teams', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: authorizedToken,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setTeams(data.teams); // Assuming backend returns { teams: [...] }
        } else {
          console.error('Error fetching teams:', data.message);
        }
      } catch (error) {
        console.error('Error fetching teams:', error);
      }
    };

    fetchTeams();
  }, [authorizedToken]); // Added dependency to ensure it runs when token changes

  const handleCreateTeam = async () => {
    const userId = user._id;

    try {
      const response = await fetch('http://localhost:5008/create-team', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authorizedToken,
        },
        body: JSON.stringify({ name: teamName, userId }),
      });
      const data = await response.json();

      if (response.ok) {
        toast.success('Team created successfully');
        setTeams([...teams, data.team]);
        setTeamName(''); // Reset input field
      } else {
        console.error('Error creating team:', data.message);
      }
    } catch (error) {
      console.error('Error creating team:', error);
    }
  };

  const handleInvite = async (teamId) => {
    try {
      const response = await fetch(`http://localhost:5008/${teamId}/invite`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authorizedToken,
        },
        body: JSON.stringify({ email: inviteEmail }),
      });
      const data = await response.json();

      if (response.ok) {
        toast.success('User invited successfully');
        setInviteEmail(''); // Reset email input
      } else {
        console.error('Error inviting user:', data.message);
      }
    } catch (error) {
      console.error('Error inviting user:', error);
    }
  };

  const handleDeleteTeam = async (teamId) => {
    try {
      const response = await fetch(`http://localhost:5008/delete-team/${teamId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: authorizedToken,
        },
      });
      const data = await response.json();
  
      if (response.ok) {
        toast.success('Team deleted successfully');
        setTeams(teams.filter((team) => team._id !== teamId));
      } else {
        console.error('Error deleting team:', data.message);
        toast.error(data.message || 'Failed to delete team');
      }
    } catch (error) {
      console.error('Error deleting team:', error);
      toast.error('An error occurred while deleting the team');
    }
  };
  

  const openModal = (team) => {
    setSelectedTeam(team);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTeam(null);
  };

  return (
    <div className='team-page'>
      <h2>Create a Team</h2>
      <input
        type="text"
        placeholder="Team Name"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
      />
      <button onClick={handleCreateTeam}>Create Team</button>

      <h2>Your Teams</h2>
      <ul>
        {teams.map((team) => (
          <li key={team._id}>
            {team.name}
            <button className="view-button" onClick={() => openModal(team)}>View</button>
            <button className="delete-button" onClick={() => handleDeleteTeam(team._id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Modal for team members and invitation */}
      <Modal show={isModalOpen} onClose={closeModal}>
        {selectedTeam && (
          <div>
            <h3>{selectedTeam.name} Members</h3>
            <ul>
              {selectedTeam.members.map((member) => (
                <li key={member._id}>{member.name}</li>
              ))}
            </ul>

            <h4>Invite a Member</h4>
            <input
              type="email"
              placeholder="User's Email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
            />
            <button onClick={() => handleInvite(selectedTeam._id)}>Invite</button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default TeamPage;
