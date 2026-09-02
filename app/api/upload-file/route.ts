import { NextResponse } from 'next/server';
import { uploadFile } from '@/lib/cloudinary';
import { withErrorHandling } from '@/lib/apiHandler';
import { getAdminFromCookie } from '@/lib/auth';

// Uploads PDFs (or any non-image file) sent as a base64 data URL, e.g. from a course module's
// "Upload PDF" button in the admin panel. Files land in Cloudinary under nyayasutra/course-files.
export const POST = withErrorHandling(async (req: Request) => {
  const admin = getAdminFromCookie();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { file } = await req.json();
  if (!file) return NextResponse.json({ error: 'No file provided.' }, { status: 400 });
  const result = await uploadFile(file, 'nyayasutra/course-files');
  return NextResponse.json(result);
});
