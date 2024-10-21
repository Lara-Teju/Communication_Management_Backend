// routes/rsvps.js
const express = require('express');
const router = express.Router();
const { handleRSVP } = require('../controllers/rsvpController');

// Define the RSVP route
router.get('/rsvp', handleRSVP);

module.exports = router;

