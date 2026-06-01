import express from 'express';

const app = express();
app.use(express.json());

app.post('/analyze', async (req, res) => {
  const { userId, amount, type } = req.body;

  // naive risk scoring
  let score = 0;

  if (amount > 10000) score += 50;
  if (type === 'TRANSFER') score += 20;

  const risk = score > 60 ? 'HIGH' : score > 30 ? 'MEDIUM' : 'LOW';

  res.json({ userId, risk, score });
});

app.listen(3003);
