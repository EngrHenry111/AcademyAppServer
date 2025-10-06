# Exam Prep Backend (Paystack + MongoDB Atlas ready)

## Quick start
1. Copy `.env.example` to `.env` and fill values (MONGO_URI, JWT_SECRET, PAYSTACK keys).
2. Install dependencies:
   ```bash
   npm install
   ```
3. (Optional) Seed sample questions and a sample tutor:
   ```bash
   npm run seed
   ```
4. Start server:
   ```bash
   npm start
   ```

API base: http://localhost:5000/api

Routes:
- POST /api/auth/register
- POST /api/auth/login
- GET  /api/questions/random/:subject/:count/:examType?
- POST /api/questions   (protected - tutor)
- POST /api/exams/submit (protected)
- POST /api/payments/initiate (protected)
- POST /api/payments/verify

Notes:
- CORS is configured for CLIENT_URL and CLIENT_DEPLOYED in .env
- Replace PAYSTACK keys with your live/test keys
