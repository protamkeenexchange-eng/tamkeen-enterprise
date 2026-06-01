import express from 'express';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());

app.post('/register', async (_req,res)=>res.json({message:'register'}));
app.post('/login', async (_req,res)=>{
 const accessToken = jwt.sign({sub:'user'}, process.env.JWT_SECRET || 'secret',{expiresIn:'15m'});
 const refreshToken = jwt.sign({sub:'user'}, process.env.JWT_REFRESH_SECRET || 'refresh',{expiresIn:'7d'});
 res.json({accessToken,refreshToken});
});
app.post('/refresh', async (_req,res)=>res.json({message:'refresh'}));

app.listen(3001);
