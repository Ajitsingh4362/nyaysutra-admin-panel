import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Inquiry from '@/lib/models/Inquiry';
import { withErrorHandling } from '@/lib/apiHandler';

export const GET = withErrorHandling(async () => {
  await connectDB();
  const inquiries = await Inquiry.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(inquiries);
});

export const POST = withErrorHandling(async (req: Request) => {
  await connectDB();
  const body = await req.json();
  if (!body.name || !body.phone) {
    return NextResponse.json({ error: 'Name and phone are required.' }, { status: 400 });
  }
  const inquiry = await Inquiry.create(body);
  return NextResponse.json(inquiry, { status: 201 });
});
