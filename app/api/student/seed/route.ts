import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Student from '@/lib/models/Student';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get('key');
  const email = searchParams.get('email');
  const password = searchParams.get('password');
  const name = searchParams.get('name') || 'Ajit Singh';

  if (key !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (!email || !password) {
    return NextResponse.json({ error: 'email and password query params required' }, { status: 400 });
  }

  try {
    await connectDB();

    let student = await Student.findOne({ email: email.toLowerCase().trim() });
    if (student) {
      student.password = password; // pre-save hook will hash it
      student.name = name;
      await student.save();
      return NextResponse.json({ success: true, message: 'Existing student password reset.', id: student._id });
    }

    student = await Student.create({ name, email, phone: '', password });
    return NextResponse.json({ success: true, message: 'Student created.', id: student._id });
  } catch (err: any) {
    return NextResponse.json({
      error: 'SEED_FAILED',
      name: err?.name || null,
      message: err?.message || String(err),
      stack: process.env.NODE_ENV === 'production' ? undefined : err?.stack,
    }, { status: 500 });
  }
}
