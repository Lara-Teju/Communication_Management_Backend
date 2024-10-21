//RSVP.js
const mongoose = require('mongoose');
const { communicationDB } = require('../config/db'); // Import communicationDB

const RSVPSchema = new mongoose.Schema({
  invitationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Invitation' },
  response: String, // 'Yes', 'No', 'Maybe'
  respondedAt: { type: Date, default: Date.now },
});

module.exports = communicationDB.model('RSVP', RSVPSchema); // Use communicationDB

