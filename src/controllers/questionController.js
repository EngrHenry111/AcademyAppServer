const Question = require('../models/Question');

exports.createQuestion = async (req, res, next) => {
  try {
    const q = new Question(req.body);
    await q.save();
    res.status(201).json(q);
  } catch (err) { next(err); }
};

exports.getRandomQuestions = async (req, res, next) => {
  try {
    const { subject, count = 10, examType } = req.params;
    const match = { subject };
    if (examType && examType !== 'null') match.examType = examType;
    const size = Math.max(1, Math.min(50, parseInt(count, 10) || 10));
    const questions = await Question.aggregate([
      { $match: match },
      { $sample: { size } },
      { $project: { correctAnswer: 0, explanation: 0 } }
    ]);
    res.json(questions);
  } catch (err) { next(err); }
};

exports.listQuestions = async (req, res, next) => {
  try {
    const { subject, examType, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (subject) filter.subject = subject;
    if (examType) filter.examType = examType;
    const questions = await Question.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit, 10));
    res.json(questions);
  } catch (err) { next(err); }
};