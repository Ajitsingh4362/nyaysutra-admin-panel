import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { mapCourse, courseToRow } from '@/lib/mappers';
import { withErrorHandling } from '@/lib/apiHandler';

export const GET = withErrorHandling(async (req: Request, { params }: { params: { id: string } }) => {
  const sb = supabaseAdmin();
  const { data, error } = await sb.from('courses').select('*').eq('id', params.id).maybeSingle();
  if (error) throw error;
  if (!data) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(mapCourse(data));
});

export const PUT = withErrorHandling(async (req: Request, { params }: { params: { id: string } }) => {
  const body = await req.json();
  const sb = supabaseAdmin();
  const { data, error } = await sb
    .from('courses')
    .update(courseToRow(body))
    .eq('id', params.id)
    .select()
    .maybeSingle();

  if (error) throw error;
  if (!data) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(mapCourse(data));
});

export const DELETE = withErrorHandling(async (req: Request, { params }: { params: { id: string } }) => {
  const sb = supabaseAdmin();
  const { error } = await sb.from('courses').delete().eq('id', params.id);
  if (error) throw error;
  return NextResponse.json({ success: true });
});
