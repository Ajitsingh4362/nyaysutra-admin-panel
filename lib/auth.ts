import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET as string;

export function signToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string) {
  try { return jwt.verify(token, JWT_SECRET) as any; }
  catch { return null; }
}

export function getAdminFromCookie() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('admin_token')?.value;
    if (!token) return null;
    return verifyToken(token);
  } catch { return null; }
}

export function getStudentFromCookie() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('student_token')?.value;
    if (!token) return null;
    return verifyToken(token);
  } catch { return null; }
}
