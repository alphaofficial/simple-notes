import { caching } from 'cache-manager';
import { CacheAdapter } from './adapter/cache.adapter';

export const InMemoryCacheFactory = {
	useFactory: async () => {
		const client = await caching('memory');
		return new CacheAdapter(client);
	},
};
