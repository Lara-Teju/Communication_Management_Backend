// eventController.js
const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
  try {
    const { title, date, time, location, description, category } = req.body; 
    const newEvent = new Event({
      title,
      date,
      time,
      location,
      description,
      category,
      attendees: [] // Ensure this is empty on creation
    });
    await newEvent.save();
    
    // Return eventId (_id) in the response
    res.status(201).json({ eventId: newEvent._id, ...newEvent._doc });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
