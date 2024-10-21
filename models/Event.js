// Event.js
const mongoose = require('mongoose');
const { communicationDB } = require('../config/db'); // Import communicationDB

const EventSchema = new mongoose.Schema({
  title: String,
  date: String,
  time: String,
  location: String,
  description: String,
  category: String,
  attendees: [{ type: String, default: [] }], // Keep it empty on creation
});

module.exports = communicationDB.model('Event', EventSchema); // Use communicationDB

