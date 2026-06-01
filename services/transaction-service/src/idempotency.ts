import crypto from 'crypto';

const store = new Map<string, any>();

export function getIdempotencyKey(req: any) {
  return req.headers['idempotency-key'] || crypto.randomUUID();
}

export function checkIdempotency(key: string) {
  return store.get(key);
}

export function saveIdempotency(key: string, value: any) {
  store.set(key, value);
}
