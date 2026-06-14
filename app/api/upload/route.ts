import { NextResponse } from 'next/server';
import { uploadImage } from '@/lib/cloudinary';
import { withErrorHandling } from '@/lib/apiHandler';

export const POST = withErrorHandling(async (req: Request) => {
  const { image } = await req.json();
  if (!image) return NextResponse.json({ error: 'No image provided.' }, { status: 400 });
  const result = await uploadImage(image, 'nyayasutra/blogs');
  return NextResponse.json(result);
});
