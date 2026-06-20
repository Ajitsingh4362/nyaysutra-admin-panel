import { NextResponse } from 'next/server';
import { signToken } from '@/lib/auth';
import { withErrorHandling } from '@/lib/apiHandler';

export const POST = withErrorHandling(async (req: Request) => {
  const { email, password } = await req.json();
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPass = process.env.ADMIN_PASSWORD;
  if (!adminEmail || !adminPass) {
    return NextResponse.json({ error: 'Admin credentials not configured on server.' }, { status: 500 });
  }
  if (email !== adminEmail || password !== adminPass) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
  const token = signToken({ email, role: 'admin' });
  const res = NextResponse.json({ success: true });
  res.cookies.set('admin_token', token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
  return res;
});
