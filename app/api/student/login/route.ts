import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { signToken } from '@/lib/auth';
import { withErrorHandling } from '@/lib/apiHandler';

export const POST = withErrorHandling(async (req: Request) => {
  const { email, password } = await req.json();
  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
  }

  const sb = supabaseAdmin();
  const { data: student, error } = await sb
    .from('students')
    .select('*')
    .eq('email', email.toLowerCase().trim())
    .maybeSingle();

  if (error) throw error;
  if (!student) {
    return NextResponse.json({ error: 'Invalid email ya password.' }, { status: 401 });
  }

  const ok = await bcrypt.compare(password, student.password);
  if (!ok) {
    return NextResponse.json({ error: 'Invalid email ya password.' }, { status: 401 });
  }

  const token = signToken({ id: student.id, email: student.email, role: 'student' });
  const res = NextResponse.json({
    success: true,
    student: { id: student.id, name: student.name, email: student.email },
  });
  res.cookies.set('student_token', token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
  return res;
});
