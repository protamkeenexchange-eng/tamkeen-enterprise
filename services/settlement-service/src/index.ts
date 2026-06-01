import express from 'express';

const app = express();
app.use(express.json());

app.post('/settle', async (req, res) => {
  const { transactionId } = req.body;

  // placeholder settlement logic
  res.json({
    transactionId,
    status: 'SETTLED',
    timestamp: new Date().toISOString()
  });
});

app.listen(3004);
