import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { signToken } from '@/lib/auth';
import { withErrorHandling } from '@/lib/apiHandler';

export const POST = withErrorHandling(async (req: Request) => {
  const { name, email, phone, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json({ error: 'Name, email and password are required.' }, { status: 400 });
  }
  if (password.length < 6) {
    return NextResponse.json({ error: 'Password must be at least 6 characters.' }, { status: 400 });
  }

  const sb = supabaseAdmin();
  const cleanEmail = email.toLowerCase().trim();

  const { data: existing } = await sb.from('students').select('id').eq('email', cleanEmail).maybeSingle();
  if (existing) {
    return NextResponse.json({ error: 'An account with this email already exists. Please login instead.' }, { status: 409 });
  }

  const hashed = await bcrypt.hash(password, 10);
  const { data: student, error } = await sb
    .from('students')
    .insert({ name, email: cleanEmail, phone: phone || '', password: hashed })
    .select()
    .single();

  if (error) throw error;

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
