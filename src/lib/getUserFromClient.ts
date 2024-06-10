import { User } from '@/types/user';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

export function getUserFromClient(): User | null {
  const token = Cookies.get('token')

  if (!token) {
    return null;
  }

  const user: User = jwtDecode(token)

  return user
}