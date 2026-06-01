import Redis from 'ioredis';
import crypto from 'crypto';

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

export function getIdempotencyKey(req: any) {
  return req.headers['idempotency-key'] || crypto.randomUUID();
}

export async function checkIdempotency(key: string) {
  const value = await redis.get(`idem:${key}`);
  return value ? JSON.parse(value) : null;
}

export async function saveIdempotency(key: string, value: any) {
  await redis.set(`idem:${key}`, JSON.stringify(value), 'EX', 3600);
}
