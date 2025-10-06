const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  examType: { type: String, enum: ['WAEC','JAMB','NECO'], required: true },
  year: Number,
  questionText: { type: String, required: true },
  options: [{ type: String }],
  correctAnswer: { type: String, required: true },
  explanation: String
}, { timestamps: true });

module.exports = mongoose.model('Question', questionSchema);