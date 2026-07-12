import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Student from '@/lib/models/Student';
import { signToken } from '@/lib/auth';
import { withErrorHandling } from '@/lib/apiHandler';

export const POST = withErrorHandling(async (req: Request) => {
  const { email, password } = await req.json();
  if (!email || !password) {
    return NextResponse.json({ error: 'Email aur password required hain.' }, { status: 400 });
  }

  await connectDB();

  const student = await Student.findOne({ email: email.toLowerCase().trim() });
  if (!student) {
    return NextResponse.json({ error: 'Invalid email ya password.' }, { status: 401 });
  }

  const ok = await student.comparePassword(password);
  if (!ok) {
    return NextResponse.json({ error: 'Invalid email ya password.' }, { status: 401 });
  }

  const token = signToken({ id: student._id.toString(), email: student.email, role: 'student' });
  const res = NextResponse.json({
    success: true,
    student: { id: student._id, name: student.name, email: student.email },
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
