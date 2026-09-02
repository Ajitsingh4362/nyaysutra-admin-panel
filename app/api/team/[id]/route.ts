import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import TeamMember from '@/lib/models/TeamMember';
import { withErrorHandling } from '@/lib/apiHandler';
import { getAdminFromCookie } from '@/lib/auth';

export const GET = withErrorHandling(async (req: Request, { params }: { params: { id: string } }) => {
  await connectDB();
  const member = await TeamMember.findById(params.id).lean();
  if (!member) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(member);
});

export const PUT = withErrorHandling(async (req: Request, { params }: { params: { id: string } }) => {
  const admin = getAdminFromCookie();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await connectDB();
  const body = await req.json();
  const member = await TeamMember.findByIdAndUpdate(params.id, body, { new: true });
  if (!member) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(member);
});

export const DELETE = withErrorHandling(async (req: Request, { params }: { params: { id: string } }) => {
  const admin = getAdminFromCookie();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await connectDB();
  await TeamMember.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
});
