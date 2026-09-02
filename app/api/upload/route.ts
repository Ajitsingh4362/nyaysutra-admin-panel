import { NextResponse } from 'next/server';
import { uploadImage } from '@/lib/cloudinary';
import { withErrorHandling } from '@/lib/apiHandler';
import { getAdminFromCookie } from '@/lib/auth';

export const POST = withErrorHandling(async (req: Request) => {
  const admin = getAdminFromCookie();
  if (!admin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { image } = await req.json();
  if (!image) return NextResponse.json({ error: 'No image provided.' }, { status: 400 });
  const result = await uploadImage(image, 'nyayasutra/blogs');
  return NextResponse.json(result);
});
