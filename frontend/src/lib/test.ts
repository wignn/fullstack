
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export const getSessionData = async () => {
  const session = await getServerSession (authOptions);
  return session;
};
