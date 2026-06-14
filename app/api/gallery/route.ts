import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Gallery from '@/lib/models/Gallery';
import { withErrorHandling } from '@/lib/apiHandler';

export const GET = withErrorHandling(async (req: Request) => {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const isAdmin = searchParams.get('admin') === '1';
  const query = isAdmin ? {} : { status: 'published' };
  const items = await Gallery.find(query).sort({ date: -1 }).lean();
  return NextResponse.json(items);
});

export const POST = withErrorHandling(async (req: Request) => {
  await connectDB();
  const body = await req.json();
  if (!body.title) {
    return NextResponse.json({ error: 'Title is required.' }, { status: 400 });
  }
  const slug = body.slug || `${body.title.toLowerCase().replace(/[^a-z0-9\s]/g,'').replace(/\s+/g,'-').substring(0,70)}-${Date.now().toString().slice(-5)}`;
  const item = await Gallery.create({ ...body, slug });
  return NextResponse.json(item, { status: 201 });
});
