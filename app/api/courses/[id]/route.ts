import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Course from '@/lib/models/Course';
import { withErrorHandling } from '@/lib/apiHandler';

export const GET = withErrorHandling(async (req: Request, { params }: { params: { id: string } }) => {
  await connectDB();
  const course = await Course.findById(params.id).lean();
  if (!course) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(course);
});

export const PUT = withErrorHandling(async (req: Request, { params }: { params: { id: string } }) => {
  await connectDB();
  const body = await req.json();
  const course = await Course.findByIdAndUpdate(params.id, body, { new: true });
  if (!course) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(course);
});

export const DELETE = withErrorHandling(async (req: Request, { params }: { params: { id: string } }) => {
  await connectDB();
  await Course.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
});
