import jwt from 'jsonwebtoken';
import express from 'express';

export interface AuthRequest extends express.Request {
  user?: any;
}

export function authMiddleware(req: AuthRequest, res: express.Response, next: express.NextFunction) {
  const header = req.headers['authorization'];

  if (!header) {
    return res.status(401).json({ error: 'Missing Authorization header' });
  }

  const token = header.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
