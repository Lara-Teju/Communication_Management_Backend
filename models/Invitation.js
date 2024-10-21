//Invitation.js
const mongoose = require('mongoose');
const { communicationDB } = require('../config/db'); // Import communicationDB

const InvitationSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  memberId: String,
  status: { type: String, default: 'Pending' }, // 'Pending', 'Accepted', 'Declined'
  sentAt: { type: Date, default: Date.now },
});
module.exports = communicationDB.model('Invitation', InvitationSchema); // Use communicationDB

