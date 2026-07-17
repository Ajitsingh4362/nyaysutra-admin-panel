import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
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

  const sb = supabaseAdmin();

  const { data: enrollment, error: findErr } = await sb
    .from('enrollments')
    .select('id, completed_modules')
    .eq('student_id', session.id)
    .eq('course_id', courseId)
    .maybeSingle();

  if (findErr) throw findErr;
  if (!enrollment) {
    return NextResponse.json({ error: 'Enrolled nahi ho is course me.' }, { status: 403 });
  }

  const completed: number[] = enrollment.completed_modules || [];
  if (!completed.includes(moduleIndex)) completed.push(moduleIndex);

  const { error: updateErr } = await sb
    .from('enrollments')
    .update({ completed_modules: completed, last_accessed_at: new Date().toISOString() })
    .eq('id', enrollment.id);

  if (updateErr) throw updateErr;

  return NextResponse.json({ success: true, completedModules: completed });
});
