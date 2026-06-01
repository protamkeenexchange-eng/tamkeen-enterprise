import express from 'express';
const app = express();
app.use(express.json());
app.get('/health',(req,res)=>res.json({service:'auth',status:'ok'}));
app.listen(3001);
