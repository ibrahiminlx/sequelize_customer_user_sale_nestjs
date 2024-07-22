
import { User } from '../entity/user.entity';

export const userProviders = [
  {
    provide: 'USERS_REPOSITORY',
    useValue: User,
  },
]