require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const questionRoutes = require('./routes/questionRoutes');
const examRoutes = require('./routes/examRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');

const app = express();
const PORT = process.env.PORT || 8000;

connectDB();

const allowed = [process.env.CLIENT_URL, process.env.CLIENT_DEPLOYED, 'http://localhost:19006'];
app.use(cors({ origin: function(origin, callback){ 
  if(!origin) return callback(null, true);
  if(allowed.indexOf(origin) === -1){ 
    const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
    return callback(new Error(msg), false);
  }
  return callback(null, true);
}}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/payments', paymentRoutes);

app.get('/', (req, res) => res.send('Engrhenrytech Exam Prep Backend (Paystack) is running'));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});