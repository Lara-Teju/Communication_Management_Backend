// rsvpController.js
// controllers/rsvpController.js
const Invitation = require('../models/Invitation');

exports.handleRSVP = async (req, res) => {
  const { eventId, memberId } = req.query;

  try {
    // Find the invitation based on eventId and memberId
    const invitation = await Invitation.findOne({ eventId, memberId });

    if (!invitation) {
      return res.status(404).send('Invitation not found.');
    }

    // Update the RSVP status
    invitation.status = 'Accepted';
    await invitation.save();

    res.send('Thank you for RSVPing to the event!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error processing RSVP.');
  }
};
