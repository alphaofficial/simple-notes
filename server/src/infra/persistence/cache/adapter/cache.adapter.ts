import { Injectable } from '@nestjs/common';
import { MemoryCache } from 'cache-manager';
import { CacheInterface } from '@/api/interfaces/cache.interface';

type OtherCacheClient = any;
type CacheClient = MemoryCache | OtherCacheClient;
@Injectable()
export class CacheAdapter implements CacheInterface {
  constructor(private readonly client: CacheClient) {}

  // ttl in ms
  async set(key: string, value: any, ttl: any): Promise<void> {
    await this.client.set(key, value, ttl);
  }
  async get<T>(key: string): Promise<T> {
    return this.client.get(key);
  }
  async del(key: string): Promise<void> {
    return this.client.del(key);
  }
  async reset(): Promise<void> {
    return this.client.reset();
  }
}
