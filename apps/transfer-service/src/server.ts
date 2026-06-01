import express from 'express';
const app = express();
app.use(express.json());

const transfers:any[]=[];

app.get('/health',(req,res)=>res.json({service:'transfer',status:'ok'}));
app.post('/transfers',(req,res)=>{ const tx={id:Date.now().toString(),status:'PENDING',...req.body}; transfers.push(tx); res.json(tx);});
app.get('/transfers/:id',(req,res)=>res.json(transfers.find(t=>t.id===req.params.id)||null));

app.listen(3004,()=>console.log('transfer service running'));