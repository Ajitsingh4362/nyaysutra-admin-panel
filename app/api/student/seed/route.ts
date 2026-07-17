import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const key = searchParams.get('key');
  const email = searchParams.get('email');
  const password = searchParams.get('password');
  const name = searchParams.get('name') || 'Student';

  if (key !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  if (!email || !password) {
    return NextResponse.json({ error: 'email and password query params required' }, { status: 400 });
  }

  try {
    const sb = supabaseAdmin();
    const cleanEmail = email.toLowerCase().trim();
    const hashed = await bcrypt.hash(password, 10);

    const { data: existing } = await sb.from('students').select('id').eq('email', cleanEmail).maybeSingle();

    if (existing) {
      const { error } = await sb.from('students').update({ password: hashed, name }).eq('id', existing.id);
      if (error) throw error;
      return NextResponse.json({ success: true, message: 'Existing student password reset.', id: existing.id });
    }

    const { data, error } = await sb
      .from('students')
      .insert({ name, email: cleanEmail, phone: '', password: hashed })
      .select()
      .single();
    if (error) throw error;

    return NextResponse.json({ success: true, message: 'Student created.', id: data.id });
  } catch (err: any) {
    return NextResponse.json({
      error: 'SEED_FAILED',
      name: err?.name || null,
      message: err?.message || String(err),
    }, { status: 500 });
  }
}
