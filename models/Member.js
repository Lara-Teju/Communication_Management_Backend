//memberModel.js
const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  //membershipType: { type: String, required: true },
  preferences: [String],
  //age: { type: Number },
  //membershipDetails: { type: Object }, // Store detailed membership data
});

module.exports = mongoose.model('Member', MemberSchema);