import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
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

  const sb = supabaseAdmin();

  const { data: course, error: courseErr } = await sb.from('courses').select('*').eq('id', courseId).maybeSingle();
  if (courseErr) throw courseErr;
  if (!course) {
    return NextResponse.json({ error: 'Course not found.' }, { status: 404 });
  }

  const { data: already } = await sb
    .from('enrollments')
    .select('id')
    .eq('student_id', session.id)
    .eq('course_id', courseId)
    .maybeSingle();

  if (already) {
    return NextResponse.json({ success: true, message: 'Already enrolled.', alreadyEnrolled: true });
  }

  // Payment gateway not wired up yet — enrollment is granted directly (payment bypassed for paid courses too).
  const { error: insertErr } = await sb.from('enrollments').insert({
    student_id: session.id,
    course_id: courseId,
    amount_paid: course.is_free ? 0 : (course.fee || 0),
    payment_status: course.is_free ? 'free' : 'pending',
    payment_id: course.is_free ? '' : 'bypass-manual',
    completed_modules: [],
  });

  if (insertErr) throw insertErr;

  return NextResponse.json({
    success: true,
    message: course.is_free ? 'Enrolled successfully!' : 'Enrolled successfully! (Payment pending — will be collected separately.)',
  });
});
