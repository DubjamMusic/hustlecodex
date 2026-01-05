// Mock Redis implementation for demonstration
// In production, this would use actual Redis/ioredis

export class RedisManager {
  private store: Map<string, string> = new Map();
  private lists: Map<string, string[]> = new Map();

  async get(key: string): Promise<string | null> {
    return this.store.get(key) || null;
  }

  async set(key: string, value: string, expirySeconds?: number): Promise<void> {
    this.store.set(key, value);
    
    if (expirySeconds) {
      setTimeout(() => {
        this.store.delete(key);
      }, expirySeconds * 1000);
    }
  }

  async delete(key: string): Promise<void> {
    this.store.delete(key);
    this.lists.delete(key);
  }

  async exists(key: string): Promise<boolean> {
    return this.store.has(key) || this.lists.has(key);
  }

  async addToList(key: string, value: string): Promise<void> {
    if (!this.lists.has(key)) {
      this.lists.set(key, []);
    }
    this.lists.get(key)!.push(value);
  }

  async getList(key: string): Promise<string[]> {
    return this.lists.get(key) || [];
  }

  async getListRange(key: string, start: number, end: number): Promise<string[]> {
    const list = this.lists.get(key) || [];
    if (end === -1) {
      return list.slice(start);
    }
    return list.slice(start, end + 1);
  }

  async listLength(key: string): Promise<number> {
    return (this.lists.get(key) || []).length;
  }

  // Utility method to clear all data (for testing)
  clear(): void {
    this.store.clear();
    this.lists.clear();
  }
}

// Singleton instance
let redisInstance: RedisManager | null = null;

export function getRedisInstance(): RedisManager {
  if (!redisInstance) {
    redisInstance = new RedisManager();
  }
  return redisInstance;
}
