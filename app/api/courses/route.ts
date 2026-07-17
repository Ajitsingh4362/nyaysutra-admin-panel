import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { mapCourse, courseToRow } from '@/lib/mappers';
import { withErrorHandling } from '@/lib/apiHandler';

export const GET = withErrorHandling(async (req: Request) => {
  const { searchParams } = new URL(req.url);
  const isAdmin = searchParams.get('admin') === '1';

  const sb = supabaseAdmin();
  let query = sb.from('courses').select('*').order('created_at', { ascending: false });
  if (!isAdmin) query = query.eq('status', 'published');

  const { data, error } = await query;
  if (error) throw error;

  return NextResponse.json((data || []).map(mapCourse));
});

export const POST = withErrorHandling(async (req: Request) => {
  const body = await req.json();
  if (!body.title) {
    return NextResponse.json({ error: 'Title is required.' }, { status: 400 });
  }
  const slug = body.slug || `${body.title.toLowerCase().replace(/[^a-z0-9\s]/g,'').replace(/\s+/g,'-').substring(0,70)}-${Date.now().toString().slice(-5)}`;

  const sb = supabaseAdmin();
  const { data, error } = await sb
    .from('courses')
    .insert(courseToRow({ ...body, slug }))
    .select()
    .single();

  if (error) throw error;
  return NextResponse.json(mapCourse(data), { status: 201 });
});
