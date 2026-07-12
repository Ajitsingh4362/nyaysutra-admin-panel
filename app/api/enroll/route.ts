import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Student from '@/lib/models/Student';
import Course from '@/lib/models/Course';
import { getStudentFromCookie } from '@/lib/auth';
import { withErrorHandling } from '@/lib/apiHandler';

export const POST = withErrorHandling(async (req: Request) => {
  const session = getStudentFromCookie();
  if (!session) {
    return NextResponse.json({ error: 'Enroll karne ke liye pehle login karo.' }, { status: 401 });
  }

  const { courseId } = await req.json();
  if (!courseId) {
    return NextResponse.json({ error: 'Course ID missing.' }, { status: 400 });
  }

  await connectDB();

  const course = await Course.findById(courseId);
  if (!course) {
    return NextResponse.json({ error: 'Course not found.' }, { status: 404 });
  }

  const student = await Student.findById(session.id);
  if (!student) {
    return NextResponse.json({ error: 'Student not found.' }, { status: 404 });
  }

  const already = student.enrollments.find((e: any) => e.course.toString() === courseId);
  if (already) {
    return NextResponse.json({ success: true, message: 'Already enrolled.', alreadyEnrolled: true });
  }

  if (!course.isFree) {
    // Paid checkout is not wired up yet — payment gateway integration pending.
    return NextResponse.json(
      { error: 'Is course ke liye online payment abhi available nahi hai. Please WhatsApp/Contact se enroll karo.' },
      { status: 402 }
    );
  }

  student.enrollments.push({
    course: course._id,
    enrolledAt: new Date(),
    amountPaid: 0,
    paymentStatus: 'free',
    progress: { completedModules: [] },
  } as any);

  await student.save();

  return NextResponse.json({ success: true, message: 'Enrolled successfully!' });
});
