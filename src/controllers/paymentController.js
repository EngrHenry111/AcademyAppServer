const { initializePayment, verifyPayment } = require('../utils/paystack');
const Payment = require('../models/Payment');
const User = require('../models/User');

exports.initiate = async (req, res, next) => {
  try {
    const { email, amount } = req.body;
    if (!email || !amount) return res.status(400).json({ message: 'email and amount required' });
    const init = await initializePayment(email, amount, { userId: req.user.id });
    // save payment draft
    await Payment.create({ userId: req.user.id, reference: init.data.reference, amount, status: 'initialized', metadata: init.data });
    res.json(init);
  } catch (err) { next(err); }
};

exports.verify = async (req, res, next) => {
  try {
    const { reference } = req.body;
    if (!reference) return res.status(400).json({ message: 'reference required' });
    const ver = await verifyPayment(reference);
    const status = ver.data.status;
    const meta = ver.data;
    // update payment record
    const payment = await Payment.findOneAndUpdate({ reference }, { status, metadata: meta }, { new: true });
    if (status === 'success' && payment) {
      // mark user as premium
      await User.findByIdAndUpdate(payment.userId, { isPremium: true });
    }
    res.json({ success: status === 'success', ver: ver.data });
  } catch (err) { next(err); }
};