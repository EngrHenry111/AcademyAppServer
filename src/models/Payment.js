const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  reference: String,
  amount: Number,
  status: String,
  metadata: Object
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);