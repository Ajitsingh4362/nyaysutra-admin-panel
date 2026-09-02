import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import TeamMember from '@/lib/models/TeamMember';
import { withErrorHandling } from '@/lib/apiHandler';
import { getAdminFromCookie } from '@/lib/auth';

export const GET = withErrorHandling(async (req: Request) => {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const isAdmin = searchParams.get('admin') === '1';

  if (isAdmin) {
    const admin = getAdminFromCookie();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const members = await TeamMember.find({}).sort({ order: 1, createdAt: -1 }).lean();
    return NextResponse.json(members);
  }

  const members = await TeamMember.find({ status: 'published' }).sort({ order: 1, createdAt: -1 }).lean();
  return NextResponse.json(members);
});

export const POST = withErrorHandling(async (req: Request) => {
  const admin = getAdminFromCookie();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await connectDB();
  const body = await req.json();
  if (!body.name) {
    return NextResponse.json({ error: 'Name is required.' }, { status: 400 });
  }
  const slug = body.slug || `${body.name.toLowerCase().replace(/[^a-z0-9\s]/g,'').replace(/\s+/g,'-').substring(0,70)}-${Date.now().toString().slice(-5)}`;
  const member = await TeamMember.create({ ...body, slug });
  return NextResponse.json(member, { status: 201 });
});
