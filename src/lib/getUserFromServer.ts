import { User } from '@/types/user';
import { jwtDecode } from 'jwt-decode';
import { cookies } from "next/headers";

export function getUserFromServer(): User | null {
  const token = cookies().get('token')?.value

  if (!token) {
    return null;
  }

  const user: User = jwtDecode(token)

  return user
}