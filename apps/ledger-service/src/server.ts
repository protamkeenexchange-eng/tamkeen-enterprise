import express from 'express';
const app = express();
app.use(express.json());

const entries:any[]=[];

app.get('/health',(req,res)=>res.json({service:'ledger',status:'ok'}));
app.post('/ledger/entries',(req,res)=>{ entries.push(req.body); res.json({status:'posted'});});
app.get('/ledger/entries',(req,res)=>res.json(entries));

app.listen(3005,()=>console.log('ledger service running'));