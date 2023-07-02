import clerk, { User } from '@clerk/clerk-sdk-node';
import { getCacheInstance } from '../persistence/cache/cache.instance';
import { UserHandlerInterface } from '@/api/interfaces/users.interface';

const USER_CACHE_TTL = 1000 * 60 * 60 * 24 * 3; // 3 days

const getUser = async (userId: string) => {
  const cache = await getCacheInstance();
  const cachedUser = await cache.get<User>(userId);
  if (cachedUser) {
    return cachedUser;
  }
  const user = await clerk.users.getUser(userId);
  await cache.set(userId, user, USER_CACHE_TTL);
  return user;
};

const userHandler: UserHandlerInterface = {
  getUser,
};

export default userHandler;
