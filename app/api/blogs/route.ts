import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Blog from '@/lib/models/Blog';
import { withErrorHandling } from '@/lib/apiHandler';

export const GET = withErrorHandling(async (req: Request) => {
  await connectDB();
  const { searchParams } = new URL(req.url);
  const isAdmin = searchParams.get('admin') === '1';
  const query = isAdmin ? {} : { status: 'published' };
  const blogs = await Blog.find(query).sort({ publishedAt: -1 }).lean();
  return NextResponse.json(blogs);
});

export const POST = withErrorHandling(async (req: Request) => {
  await connectDB();
  const body = await req.json();
  if (!body.title) {
    return NextResponse.json({ error: 'Title is required.' }, { status: 400 });
  }
  const wordCount = body.content?.replace(/<[^>]*>/g,'').split(/\s+/).length || 0;
  const readTime = `${Math.max(1, Math.ceil(wordCount/200))} min read`;
  const slug = body.slug || body.title.toLowerCase().replace(/[^a-z0-9\s]/g,'').replace(/\s+/g,'-').substring(0,80);
  const blog = await Blog.create({ ...body, slug, readTime });
  return NextResponse.json(blog, { status: 201 });
});
