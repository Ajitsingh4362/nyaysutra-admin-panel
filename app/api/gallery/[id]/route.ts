import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Gallery from '@/lib/models/Gallery';
import { withErrorHandling } from '@/lib/apiHandler';

export const PUT = withErrorHandling(async (req: Request, { params }: { params: { id: string } }) => {
  await connectDB();
  const body = await req.json();
  const item = await Gallery.findByIdAndUpdate(params.id, body, { new: true });
  if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(item);
});

export const DELETE = withErrorHandling(async (req: Request, { params }: { params: { id: string } }) => {
  await connectDB();
  await Gallery.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
});
