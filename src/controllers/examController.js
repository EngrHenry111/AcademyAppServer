const Question = require('../models/Question');
const ExamAttempt = require('../models/ExamAttempt');
const User = require('../models/User');

exports.submitExam = async (req, res, next) => {
  try {
    const { userId, subject, examType, answers } = req.body;
    if (!userId || !answers || !Array.isArray(answers)) return res.status(400).json({ message: 'userId and answers[] required' });
    let score = 0;
    const results = await Promise.all(answers.map(async (ans) => {
      const q = await Question.findById(ans.questionId).lean();
      const isCorrect = q && q.correctAnswer === ans.selected;
      if (isCorrect) score++;
      return { questionId: ans.questionId, selected: ans.selected, isCorrect: !!isCorrect };
    }));
    const attempt = new ExamAttempt({ userId, subject: subject || 'Unknown', examType: examType || 'Unknown', score, totalQuestions: answers.length, answers: results });
    await attempt.save();
    await User.findByIdAndUpdate(userId, { $push: { progress: { subject: subject || 'Unknown', score } } });
    res.json({ score, total: answers.length, results });
  } catch (err) { next(err); }
};

exports.getAttemptsForUser = async (req, res, next) => {
  try {
    const userId = req.params.userId || req.user.id;
    const attempts = await ExamAttempt.find({ userId }).sort({ takenAt: -1 });
    res.json(attempts);
  } catch (err) { next(err); }
};