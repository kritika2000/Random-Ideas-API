const mongoose = require('mongoose');
const { Schema } = mongoose;

const IdeaSchema = new Schema({
  id: { type: Number },
  text: { type: String },
  tag: { type: String },
  username: { type: String },
  date: { type: String, default: new Date().toISOString().slice(0, 10) },
});

module.exports = mongoose.model('Idea', IdeaSchema);
