import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export const getUserFromCookie = async () => {
  const cookieStore = cookies(); // ✅ No need for 'await' in 15.3+
  const token = cookieStore.get('token')?.value;

  if (!token) return null;

  try {
    const decoded = jwt.decode(token);
    return decoded;
  } catch (err) {
    return null;
  }
};
