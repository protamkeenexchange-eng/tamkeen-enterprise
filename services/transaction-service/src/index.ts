import express from 'express';
import { LedgerEngine } from './ledger';
import { acquireLock, releaseLock, isLocked } from './wallet-lock';

const app = express();
app.use(express.json());

const ledger = new LedgerEngine();

app.post('/transfer', async (req, res) => {
  const { fromWallet, toWallet, amount } = req.body;

  if (isLocked(fromWallet) || isLocked(toWallet)) {
    return res.status(409).json({ error: 'Wallet locked' });
  }

  acquireLock(fromWallet);
  acquireLock(toWallet);

  try {
    const result = ledger.postTransaction({
      id: crypto.randomUUID(),
      entries: [
        { accountId: fromWallet, debit: amount },
        { accountId: toWallet, credit: amount }
      ]
    });

    res.json(result);
  } catch (e: any) {
    res.status(400).json({ error: e.message });
  } finally {
    releaseLock(fromWallet);
    releaseLock(toWallet);
  }
});

app.listen(3002);
