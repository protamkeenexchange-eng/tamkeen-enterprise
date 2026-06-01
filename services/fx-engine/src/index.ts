import express from 'express';

const app = express();
app.use(express.json());

const rates: Record<string, number> = {
  'USD_EUR': 0.92,
  'EUR_USD': 1.08,
  'USD_SAR': 3.75,
  'SAR_USD': 0.266
};

app.post('/convert', (req, res) => {
  const { from, to, amount } = req.body;
  const key = `${from}_${to}`;

  const rate = rates[key];
  if (!rate) {
    return res.status(400).json({ error: 'Rate not found' });
  }

  res.json({
    from,
    to,
    amount,
    converted: amount * rate
  });
});

app.listen(3006);
