import express from 'express';

const app = express();
app.use(express.json());

let liquidityPool = {
  USD: 1000000,
  EUR: 500000,
  SAR: 2000000
};

app.get('/liquidity', (req, res) => {
  res.json(liquidityPool);
});

app.post('/reserve', (req, res) => {
  const { currency, amount } = req.body;

  if (liquidityPool[currency] < amount) {
    return res.status(400).json({ error: 'Insufficient liquidity' });
  }

  liquidityPool[currency] -= amount;

  res.json({ currency, reserved: amount, remaining: liquidityPool[currency] });
});

app.listen(3005);
