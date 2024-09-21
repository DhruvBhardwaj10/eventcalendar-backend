const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  reminder: { type: Date },
});

module.exports = mongoose.model('Event', eventSchema);