export interface CacheInterface {
  readonly set: (key: string, value: any, ttl: any) => Promise<void>;
  readonly get: <T>(key: string) => Promise<T>;
  readonly del: (key: string) => Promise<void>;
  readonly reset: () => Promise<void>;
}
