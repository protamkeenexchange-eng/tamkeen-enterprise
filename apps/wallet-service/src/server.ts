import express from 'express';
const app = express();
app.use(express.json());

const wallets = new Map();

app.get('/health',(req,res)=>res.json({service:'wallet',status:'ok'}));
app.post('/wallets',(req,res)=>{ const wallet={id:Date.now().toString(),...req.body}; wallets.set(wallet.id,wallet); res.json(wallet);});
app.get('/wallets/:id',(req,res)=>res.json(wallets.get(req.params.id)||null));

app.listen(3003,()=>console.log('wallet service running'));