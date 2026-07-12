import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Student from '@/lib/models/Student';
import { signToken } from '@/lib/auth';
import { withErrorHandling } from '@/lib/apiHandler';

export const POST = withErrorHandling(async (req: Request) => {
  const { name, email, phone, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json({ error: 'Name, email aur password required hain.' }, { status: 400 });
  }
  if (password.length < 6) {
    return NextResponse.json({ error: 'Password kam se kam 6 characters ka hona chahiye.' }, { status: 400 });
  }

  await connectDB();

  const existing = await Student.findOne({ email: email.toLowerCase().trim() });
  if (existing) {
    return NextResponse.json({ error: 'Is email se account already exist karta hai. Login karo.' }, { status: 409 });
  }

  const student = await Student.create({ name, email, phone, password });

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
