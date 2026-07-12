import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Student from '@/lib/models/Student';
import { getStudentFromCookie } from '@/lib/auth';
import { withErrorHandling } from '@/lib/apiHandler';
import '@/lib/models/Course';

export const GET = withErrorHandling(async () => {
  const session = getStudentFromCookie();
  if (!session) {
    return NextResponse.json({ error: 'Not logged in' }, { status: 401 });
  }

  await connectDB();
  const student = await Student.findById(session.id)
    .select('-password')
    .populate('enrollments.course');

  if (!student) {
    return NextResponse.json({ error: 'Student not found' }, { status: 404 });
  }

  return NextResponse.json({ student });
});
