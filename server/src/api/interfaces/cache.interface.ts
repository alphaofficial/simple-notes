export interface CacheInterface {
  readonly set: (key: string, value: unknown, ttl: number) => Promise<void>;
  readonly get: <T>(key: string) => Promise<T>;
  readonly del: (key: string) => Promise<void>;
  readonly reset: () => Promise<void>;
}
