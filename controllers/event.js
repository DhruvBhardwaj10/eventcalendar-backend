const express = require('express');

const Event = require('../models/Event');

// Create a new event (POST /api/events)
const createEvent= async (req, res) => {
  try {
    const { userId, title, description, start, end, reminder } = req.body;

    const event = new Event({
      userId,  // Now passed from frontend in the body
      title,
      description,
      start,
      end,
      reminder,
    });

    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all events for a user (GET /api/events/:userId)
const getEventDetail=async (req, res) => {
  try {
    const { userId } = req.params;  // Get userId from the URL params
    const events = await Event.find({ userId });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an event (PUT /api/events/:id)
const updateEvent= async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, title, description, start, end, reminder } = req.body;

    const event = await Event.findOneAndUpdate(
      { _id: id, userId },  // Match the event by _id and userId
      { title, description, start, end, reminder },
      { new: true }
    );
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an event (DELETE /api/events/:id/:userId)
const deleteEvent= async (req, res) => {
  try {
    const { id, userId } = req.params;

    const event = await Event.findOneAndDelete({ _id: id, userId });
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json({ message: 'Event deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports={
    createEvent,
    getEventDetail,
    updateEvent,
    deleteEvent
}

