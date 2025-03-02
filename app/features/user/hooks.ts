import { useSuspenseQuery } from '@tanstack/react-query';
import { type User, getUserAPI } from '~/remotes';

export function useUser() {
  return useSuspenseQuery<User>({
    queryKey: ['user'],
    queryFn: getUserAPI,
  });
}
