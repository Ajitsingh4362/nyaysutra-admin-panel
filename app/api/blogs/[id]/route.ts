import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Blog from '@/lib/models/Blog';
import { withErrorHandling } from '@/lib/apiHandler';

export const GET = withErrorHandling(async (req: Request, { params }: { params: { id: string } }) => {
  await connectDB();
  const blog = await Blog.findById(params.id).lean();
  if (!blog) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(blog);
});

export const PUT = withErrorHandling(async (req: Request, { params }: { params: { id: string } }) => {
  await connectDB();
  const body = await req.json();
  const wordCount = body.content?.replace(/<[^>]*>/g,'').split(/\s+/).length || 0;
  const readTime = `${Math.max(1, Math.ceil(wordCount/200))} min read`;
  const blog = await Blog.findByIdAndUpdate(params.id, { ...body, readTime }, { new: true });
  if (!blog) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(blog);
});

export const DELETE = withErrorHandling(async (req: Request, { params }: { params: { id: string } }) => {
  await connectDB();
  await Blog.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
});
