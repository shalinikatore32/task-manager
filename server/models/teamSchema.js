// models/Team.js
const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: String,
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Signup' }],
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
  admin: { type: mongoose.Schema.Types.ObjectId, ref: 'Signup' } // Admin user
});


module.exports = mongoose.model('Team', teamSchema);
