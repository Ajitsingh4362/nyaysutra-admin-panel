import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { getStudentFromCookie } from '@/lib/auth';
import { mapStudent } from '@/lib/mappers';
import { withErrorHandling } from '@/lib/apiHandler';

export const GET = withErrorHandling(async () => {
  const session = getStudentFromCookie();
  if (!session) {
    return NextResponse.json({ error: 'Not logged in' }, { status: 401 });
  }

  const sb = supabaseAdmin();

  const { data: student, error: studentErr } = await sb
    .from('students')
    .select('id, name, email, phone, created_at')
    .eq('id', session.id)
    .maybeSingle();

  if (studentErr) throw studentErr;
  if (!student) {
    return NextResponse.json({ error: 'Student not found' }, { status: 404 });
  }

  const { data: enrollments, error: enrollErr } = await sb
    .from('enrollments')
    .select('*, course:courses(*)')
    .eq('student_id', student.id);

  if (enrollErr) throw enrollErr;

  return NextResponse.json({ student: mapStudent(student, enrollments || []) });
});
