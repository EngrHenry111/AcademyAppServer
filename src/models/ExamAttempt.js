const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
  selected: String,
  isCorrect: Boolean
});

const examAttemptSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  subject: String,
  examType: String,
  score: Number,
  totalQuestions: Number,
  answers: [answerSchema],
  takenAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('ExamAttempt', examAttemptSchema);