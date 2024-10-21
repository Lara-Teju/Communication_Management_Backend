//db.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Separate connections for different databases
const memberManagementDB = mongoose.createConnection(process.env.MEMBER_MANAGEMENT_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Catch and display errors for the member management DB
memberManagementDB.on('error', (error) => {
  console.error('Error connecting to member_management database:', error);
});

memberManagementDB.once('open', () => {
  console.log('Connected to member_management database.');
});

const communicationDB = mongoose.createConnection(process.env.COMMUNICATION_DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Catch and display errors for the communication DB
communicationDB.on('error', (error) => {
  console.error('Error connecting to communication_module database:', error);
});

communicationDB.once('open', () => {
  console.log('Connected to communication_module database.');
});

module.exports = { memberManagementDB, communicationDB };
