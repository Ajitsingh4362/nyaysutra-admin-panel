import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Student from '@/lib/models/Student';
import { getStudentFromCookie } from '@/lib/auth';
import { withErrorHandling } from '@/lib/apiHandler';

export const POST = withErrorHandling(async (req: Request) => {
  const session = getStudentFromCookie();
  if (!session) {
    return NextResponse.json({ error: 'Login required.' }, { status: 401 });
  }

  const { courseId, moduleIndex } = await req.json();
  if (!courseId || moduleIndex === undefined) {
    return NextResponse.json({ error: 'courseId aur moduleIndex required hain.' }, { status: 400 });
  }

  await connectDB();
  const student = await Student.findById(session.id);
  if (!student) {
    return NextResponse.json({ error: 'Student not found.' }, { status: 404 });
  }

  const enrollment = student.enrollments.find((e: any) => e.course.toString() === courseId);
  if (!enrollment) {
    return NextResponse.json({ error: 'Enrolled nahi ho is course me.' }, { status: 403 });
  }

  if (!enrollment.progress.completedModules.includes(moduleIndex)) {
    enrollment.progress.completedModules.push(moduleIndex);
  }
  enrollment.progress.lastAccessedAt = new Date();

  await student.save();

  return NextResponse.json({ success: true, completedModules: enrollment.progress.completedModules });
});
