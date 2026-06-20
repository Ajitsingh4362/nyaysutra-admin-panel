import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Certificate from '@/lib/models/Certificate';
import { withErrorHandling } from '@/lib/apiHandler';

export const GET = withErrorHandling(async (req: Request, { params }: { params: { id: string } }) => {
  await connectDB();
  const cert = await Certificate.findById(params.id).lean();
  if (!cert) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(cert);
});

export const PUT = withErrorHandling(async (req: Request, { params }: { params: { id: string } }) => {
  await connectDB();
  const body = await req.json();
  const cert = await Certificate.findByIdAndUpdate(params.id, body, { new: true });
  if (!cert) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(cert);
});

export const DELETE = withErrorHandling(async (req: Request, { params }: { params: { id: string } }) => {
  await connectDB();
  await Certificate.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
});
