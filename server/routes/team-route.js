const express = require('express');
const teamRouter = express.Router();
const Team = require('../models/teamSchema'); // Import the Team model
const User = require('../models/user-model'); // Import the User model
const authMiddleware = require('../controllers/authMiddleware');



// Fetch all teams for the authenticated user
teamRouter.get('/fetch-teams', authMiddleware, async (req, res) => {
  try {
    const teams = await Team.find({ members: req.user._id }).populate('members', 'name'); // Fetch teams where the user is a member
    res.json({ teams });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new team
teamRouter.post('/create-team', authMiddleware, async (req, res) => {
  const { name, userId } = req.body;
  try {
    // Create a new team and add the user as the first member
    const newTeam = new Team({
      name,
      members: [userId], // Add the user as a member of the new team
      admin:userId,
    });
    const savedTeam = await newTeam.save();

    // Now, find the user by userId and add the team's ID to their 'teams' array
    const user = await User.findById(userId);
    if (user) {
      user.teams.push(savedTeam._id); // Push the newly created team's ID into the user's teams array
      await user.save(); // Save the updated user document
    }

    res.status(201).json({ team: savedTeam });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

teamRouter.delete('/delete-team/:teamId', authMiddleware, async (req, res) => {
  const { teamId } = req.params;
  const userId = req.user?._id; // Use optional chaining to avoid errors if user is undefined

  if (!userId) {
    return res.status(403).json({ message: 'User not authenticated' });
  }

  try {
    // Find the team to delete
    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    // Check if the user is the admin of the team
    if (team.admin.toString() !== userId.toString()) {
      return res.status(403).json({ message: 'You are not authorized to delete this team' });
    }

    // Remove the team from the users' teams array
    await User.updateMany(
      { teams: teamId },
      { $pull: { teams: teamId } }
    );

    // Now, delete the team itself
    await Team.findByIdAndDelete(teamId);

    res.status(200).json({ message: 'Team deleted successfully' });
  } catch (error) {
    console.error("Error deleting team:", error);
    res.status(500).json({ message: 'Server error' });
  }
});




// Invite a member to a team
teamRouter.post('/:teamId/invite', authMiddleware, async (req, res) => {
  const { teamId } = req.params;
  const { email } = req.body;

  try {
    // Find the user by email
    const userToInvite = await User.findOne({ email });
    if (!userToInvite) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Add the user to the team's members
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    // Prevent adding the same member multiple times
    if (team.members.includes(userToInvite._id)) {
      return res.status(400).json({ message: 'User is already a member' });
    }

    team.members.push(userToInvite._id);
    await team.save();

    // Notify the invited user (optional - e.g., send an email)

    res.status(200).json({ message: 'User invited successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = teamRouter;
