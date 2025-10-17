require('dotenv').config();
const connectDB = require('../config/db');
const Question = require('../models/Question');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const sampleQuestions = [
  { subject: 'Mathematics', examType: 'JAMB', year: 2020, questionText: 'If f(x)=2x+3, what is f(5)?', options:['A. 10','B. 13','C. 8','D. 5'], correctAnswer:'B', explanation:'2*5+3=13' },
  { subject: 'English', examType: 'WAEC', year: 2019, questionText: 'Choose the correct sentence.', options:['A. He don\'t like it.','B. He doesn\'t likes it.','C. He doesn\'t like it.','D. He aren\'t like it.'], correctAnswer:'C', explanation:'Third person uses does not' }
];

const seed = async ()=>{
  await connectDB();
  await Question.deleteMany({});
  await Question.insertMany(sampleQuestions);
  const existing = await User.findOne({ email: 'henryengrakpan@gmail.com' });
  if (!existing) {
    const hash = await bcrypt.hash('engrhenrytech', 10);
    await User.create({ name: 'EngrHenryTech', email: 'henryengrakpan@gmail.com', password: hash, role: 'tutor' });
  }
  console.log('Seeded DB');
  process.exit(0);
};

seed();