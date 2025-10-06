const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student','tutor'], default: 'student' },
  isPremium: { type: Boolean, default: false },
  progress: [{ subject: String, score: Number, date: Date }]
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);