import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'DevakiSuperSecret123';

export async function getUserFromCookie() {
  try {
    const cookieStore = cookies(); // ✅ no need to await this anymore
    const token = cookieStore.get('token')?.value;

    if (!token) return null;

    const decoded = jwt.verify(token, SECRET) as { id: number; role: string };
    return decoded;
  } catch (err) {
    console.error('Invalid token:', err);
    return null;
  }
}
