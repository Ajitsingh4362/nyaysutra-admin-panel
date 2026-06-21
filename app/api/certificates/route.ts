import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Certificate from '@/lib/models/Certificate';
import { withErrorHandling } from '@/lib/apiHandler';
import { getAdminFromCookie } from '@/lib/auth';

export const GET = withErrorHandling(async (req: Request) => {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const certNumber = searchParams.get('number');
  const isAdmin = searchParams.get('admin') === '1';

  if (certNumber) {
    // Public verification lookup — only active certificates, and only the
    // fields needed to display a verification result (no internal record
    // id, timestamps, etc.)
    const cert = await Certificate.findOne(
      { certificateNumber: certNumber.trim(), status: 'active' },
      'certificateNumber studentName courseName courseType duration startDate endDate grade issueDate signatoryName signatoryDesignation status'
    ).lean();
    return NextResponse.json(cert || null);
  }

  // Full certificate list (with student names, dates, etc.) is sensitive
  // student data — only return it to an authenticated admin session.
  if (isAdmin) {
    const admin = getAdminFromCookie();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const certs = await Certificate.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(certs);
  }

  return NextResponse.json({ error: 'A certificate number is required.' }, { status: 400 });
});

export const POST = withErrorHandling(async (req: Request) => {
  const admin = getAdminFromCookie();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

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
