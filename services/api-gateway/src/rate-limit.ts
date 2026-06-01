import Redis from 'ioredis';
import express from 'express';

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

export async function rateLimit(req: express.Request, res: express.Response, next: express.NextFunction) {
  const ip = req.ip;
  const key = `rate:${ip}`;

  const current = await redis.incr(key);

  if (current === 1) {
    await redis.expire(key, 60);
  }

  if (current > 100) {
    return res.status(429).json({ error: 'Too many requests' });
  }

  next();
}
