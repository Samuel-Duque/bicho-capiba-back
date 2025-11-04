export default class CacheManager {
  // Only enable cache when running in production
  private static enabled = process.env.NODE_ENV === 'production';

  private static async getRedis() {
    if (!this.enabled) {
      return null;
    }

    // dynamically import redis only when needed (production)
    const mod = await import('@adonisjs/redis/services/main');
    // module has default export in original code
    return (mod as any).default || mod;
  }

  static async create(key: string, content: string, ttlInSeconds?: number) {
    const redis = await this.getRedis();
    if (!redis) return;

    if (ttlInSeconds) {
      await redis.set(key, content, 'EX', ttlInSeconds);
    } else {
      await redis.set(key, content);
    }
  }

  static async get(key: string) {
    const redis = await this.getRedis();
    if (!redis) return false;

    const content = await redis.get(key);

    return content ? JSON.parse(content) : false;
  }

  static async remember<T>(
    key: string,
    callback: () => Promise<T>,
    ttlInSeconds?: number
  ): Promise<T> {
    // If cache disabled, just execute the callback and return result
    if (!this.enabled) {
      return callback();
    }

    const cachedContent = await this.get(key);

    if (cachedContent) {
      return cachedContent as T;
    }

    const content = await callback();
    await this.create(key, JSON.stringify(content), ttlInSeconds);
    return content;
  }

  static async delete(keyPattern: string) {
    const redis = await this.getRedis();
    if (!redis) return;

    let cursor = '0';

    do {
      const [newCursor, keys] = await redis.scan(
        cursor,
        'MATCH',
        keyPattern,
        'COUNT',
        100
      );
      cursor = newCursor;

      if (keys.length) {
        await redis.unlink(...keys);
      }
    } while (cursor !== '0');
  }
}
