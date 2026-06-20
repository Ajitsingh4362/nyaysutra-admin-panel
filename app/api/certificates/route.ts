import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Certificate from '@/lib/models/Certificate';
import { withErrorHandling } from '@/lib/apiHandler';

export const GET = withErrorHandling(async (req: Request) => {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const certNumber = searchParams.get('number');

  if (certNumber) {
    // Used for public verification lookups
    const cert = await Certificate.findOne({ certificateNumber: certNumber, status: 'active' }).lean();
    return NextResponse.json(cert || null);
  }

  const certs = await Certificate.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(certs);
});

export const POST = withErrorHandling(async (req: Request) => {
  await connectDB();
  const body = await req.json();
  if (!body.studentName || !body.courseName) {
    return NextResponse.json({ error: 'Student name and course name are required.' }, { status: 400 });
  }

  // Auto-generate sequential certificate number: NS-CERT-YYYY-0001
  const year = new Date().getFullYear();
  const prefix = `NS-CERT-${year}-`;
  const lastCert = await Certificate.findOne({ certificateNumber: { $regex: `^${prefix}` } })
    .sort({ certificateNumber: -1 })
    .lean();

  let nextSeq = 1;
  if (lastCert && (lastCert as any).certificateNumber) {
    const lastSeq = parseInt((lastCert as any).certificateNumber.split('-').pop(), 10);
    if (!isNaN(lastSeq)) nextSeq = lastSeq + 1;
  }
  const certificateNumber = body.certificateNumber || `${prefix}${String(nextSeq).padStart(4, '0')}`;

  const cert = await Certificate.create({
    ...body,
    certificateNumber,
    issueDate: body.issueDate || new Date().toISOString().split('T')[0],
  });
  return NextResponse.json(cert, { status: 201 });
});
