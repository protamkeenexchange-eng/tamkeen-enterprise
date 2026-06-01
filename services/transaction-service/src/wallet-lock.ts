type Lock = {
  walletId: string;
  lockedAt: number;
};

const locks = new Map<string, Lock>();

export function acquireLock(walletId: string): boolean {
  if (locks.has(walletId)) return false;
  locks.set(walletId, { walletId, lockedAt: Date.now() });
  return true;
}

export function releaseLock(walletId: string): void {
  locks.delete(walletId);
}

export function isLocked(walletId: string): boolean {
  return locks.has(walletId);
}
