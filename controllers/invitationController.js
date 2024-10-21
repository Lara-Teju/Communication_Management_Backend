// invitationController.js
const { communicationDB, memberManagementDB } = require('../config/db'); // Import the separate DB connections
const nodemailer = require('nodemailer');

// Load models and use respective databases
const Invitation = communicationDB.model('Invitation', require('../models/Invitation').InvitationSchema); // Use communication DB
const Event = communicationDB.model('Event', require('../models/Event').EventSchema); // Use communication DB
const Member = memberManagementDB.model('Member', require('../models/Member').MemberSchema); // Use member_management DB

// Invitation creation function
exports.createInvitation = async (req, res) => {
  try {
    const { eventId } = req.body;

    // Fetch event details
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found.' });
    }

    // Fetch members from the member_management database based on event preference
    const members = await Member.find({ preferences: { $in: [event.category] } });

    if (members.length === 0) {
      return res.status(404).json({ message: 'No members found with matching preferences for the event.' });
    }

    // Create invitations and send emails
    const invitations = await Promise.all(members.map(async (member) => {
      const invitation = new Invitation({
        eventId,
        memberId: member._id,
      });
      await invitation.save();

      // Send email to the member
      await sendEmail(member.email, event, invitation);
      return invitation;
    }));

    console.log('Invitations created successfully:', invitations);
    res.status(201).json(invitations);
  } catch (error) {
    console.error('Error creating invitations:', error);
    res.status(500).json({ message: error.message });
  }
};

// Function to send emails
async function sendEmail(email, event, invitation) {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Invitation to ${event.title}`,
      text: `You are invited to the event "${event.title}" happening on ${event.date} at ${event.location}.\n To confirm your attendance, please click the link below:\n <a href="http://your-app.com/rsvp?eventId=${event.eventId}&memberId=${event.memberId}">RSVP Now</a>\n\nThank you,\n The Events Team `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully to:', email);
  } catch (error) {
    console.error('Error sending email to', email, ':', error);
    throw error; // Re-throw error to be caught in the main function
  }
}

// Fetch all invitations
exports.getInvitations = async (req, res) => {
  try {
    const invitations = await Invitation.find().populate('eventId');
    console.log('Invitations fetched successfully:', invitations);
    res.status(200).json(invitations);
  } catch (error) {
    console.error('Error fetching invitations:', error);
    res.status(500).json({ message: error.message });
  }
};
