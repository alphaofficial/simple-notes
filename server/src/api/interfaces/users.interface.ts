import { User } from '@clerk/clerk-sdk-node';

export interface UserHandlerInterface {
  readonly getUser: (userId: string) => Promise<User>;
}
