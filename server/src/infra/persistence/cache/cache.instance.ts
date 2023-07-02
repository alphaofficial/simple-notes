import { caching } from 'cache-manager';
import { CacheAdapter } from './cache.adapter';
import { CacheInterface } from '@/api/interfaces/cache.interface';

let cacheInstance: CacheInterface;
export const getCacheInstance = async (): Promise<CacheInterface> => {
  if (!cacheInstance) {
    const client = await caching('memory');
    cacheInstance = new CacheAdapter(client);
  }

  return cacheInstance;
};
