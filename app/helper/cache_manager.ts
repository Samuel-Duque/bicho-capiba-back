import redis from "@adonisjs/redis/services/main";
export default class CacheManager {
  static async create(key: string, content: string, ttlInSeconds?: number) {
    if (ttlInSeconds) {
      await redis.set(key, content, 'EX', ttlInSeconds);
    } else {
      await redis.set(key, content);
    }
  }

  static async get(key: string) {
    const content = await redis.get(key);

    return content ? JSON.parse(content) : false;
  }

  

  static async remember<T>(
    key: string,
    callback: () => Promise<T>,
    ttlInSeconds?: number
  ): Promise<T> {
    const cachedContent = await this.get(key);

    if (cachedContent) {
      return cachedContent;
    }

    const content = await callback();
    await this.create(key, JSON.stringify(content), ttlInSeconds);
    return content;
  }

  static async delete(keyPattern: string) {
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
