const axios = require('axios');
const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;
if (!PAYSTACK_SECRET) console.warn('PAYSTACK_SECRET_KEY not set in .env');

exports.initializePayment = async (email, amount, metadata={}) => {
  const res = await axios.post('https://api.paystack.co/transaction/initialize', {
    email, amount: Math.round(amount * 100), metadata
  }, { headers: { Authorization: `Bearer ${PAYSTACK_SECRET}` } });
  return res.data;
};

exports.verifyPayment = async (reference) => {
  const res = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, { headers: { Authorization: `Bearer ${PAYSTACK_SECRET}` } });
  return res.data;
};