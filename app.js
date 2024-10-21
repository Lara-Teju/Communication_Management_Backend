//app.js
const express = require('express');
const dotenv = require('dotenv');
const eventRoutes = require('./routes/events');
const invitationRoutes = require('./routes/invitations');
const rsvpRoutes = require('./routes/rsvps');
const cors = require('cors');
const { memberManagementDB, communicationDB } = require('./config/db'); // Import the connections

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// No need to connect again; we already have the connections set up in db.js
// Use the connections to define models if necessary, for example:
// const Event = communicationDB.model('Event', eventSchema);

// Routes
app.use('/api/events', eventRoutes);
app.use('/api/invitations', invitationRoutes);
app.use('/api', rsvpRoutes);  // Add RSVP route under /api

const PORT = process.env.PORT || 3000; // Set PORT to match .env
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
