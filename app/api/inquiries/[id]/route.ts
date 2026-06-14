import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Inquiry from '@/lib/models/Inquiry';
import { withErrorHandling } from '@/lib/apiHandler';

export const PUT = withErrorHandling(async (req: Request, { params }: { params: { id: string } }) => {
  await connectDB();
  const body = await req.json();
  const inquiry = await Inquiry.findByIdAndUpdate(params.id, body, { new: true });
  if (!inquiry) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(inquiry);
});

export const DELETE = withErrorHandling(async (req: Request, { params }: { params: { id: string } }) => {
  await connectDB();
  await Inquiry.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
});
