import { NextResponse } from 'next/server';
import { getAdminFromCookie } from '@/lib/auth';

export async function GET() {
  const admin = getAdminFromCookie();
  if (!admin) {
    return NextResponse.json({ authed: false }, { status: 401 });
  }
  return NextResponse.json({ authed: true, email: admin.email });
}
