export interface SecretStore {
  get(key: string): Promise<string | null>;
  set(key: string, value: string): Promise<void>;
}

// Simple in-memory fallback (replace with Vault/KMS in production)
const store = new Map<string, string>();

export const vault: SecretStore = {
  async get(key: string) {
    return store.get(key) || null;
  },
  async set(key: string, value: string) {
    store.set(key, value);
  }
};