import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Certificate from '@/lib/models/Certificate';
import { withErrorHandling } from '@/lib/apiHandler';
import { getAdminFromCookie } from '@/lib/auth';

function requireAdmin() {
  const admin = getAdminFromCookie();
  if (!admin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  return null;
}

export const GET = withErrorHandling(async (req: Request, { params }: { params: { id: string } }) => {
  const authError = requireAdmin();
  if (authError) return authError;

  await connectDB();
  const cert = await Certificate.findById(params.id).lean();
  if (!cert) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(cert);
});

export const PUT = withErrorHandling(async (req: Request, { params }: { params: { id: string } }) => {
  const authError = requireAdmin();
  if (authError) return authError;

  await connectDB();
  const body = await req.json();
  const cert = await Certificate.findByIdAndUpdate(params.id, body, { new: true });
  if (!cert) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(cert);
});

export const DELETE = withErrorHandling(async (req: Request, { params }: { params: { id: string } }) => {
  const authError = requireAdmin();
  if (authError) return authError;

  await connectDB();
  await Certificate.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
});
