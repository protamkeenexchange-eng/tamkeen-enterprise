import redis from './redis';

const TTL_SECONDS = 5;

export async function acquireLock(walletId: string): Promise<boolean> {
  const key = `lock:wallet:${walletId}`;
  const result = await redis.set(key, '1', 'NX', 'EX', TTL_SECONDS);
  return result === 'OK';
}

export async function releaseLock(walletId: string): Promise<void> {
  await redis.del(`lock:wallet:${walletId}`);
}

export async function isLocked(walletId: string): Promise<boolean> {
  const val = await redis.get(`lock:wallet:${walletId}`);
  return val !== null;
}
