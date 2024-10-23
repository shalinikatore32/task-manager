const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Signup', required: true }, // Task creator
  title: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date, required: true },
  dueDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Signup' },  // The user to whom the task is assigned
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' } });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
