import { connectDB } from '@/lib/mongodb';
import Blog from '@/lib/models/Blog';
import BlogClient, { BlogPostSummary } from './BlogClient';

export const revalidate = 0; // always fetch fresh, so newly-published blogs show up immediately

async function getPublishedBlogs(): Promise<BlogPostSummary[]> {
  try {
    await connectDB();
    const dbBlogs = await Blog.find({ status: 'published' }).sort({ publishedAt: -1 }).lean();
    return dbBlogs.map((b: any) => ({
      id: String(b._id),
      slug: b.slug,
      title: b.title,
      category: b.category || 'Legal Article',
      excerpt: b.excerpt || '',
      coverImage: b.coverImage || '',
      readTime: b.readTime || '5 min read',
      publishedAt: b.publishedAt || b.createdAt || new Date().toISOString(),
      tags: b.tags || [],
      featured: !!b.featured,
    }));
  } catch (error) {
    console.error('Blog list fetch error:', error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPublishedBlogs();
  return <BlogClient posts={posts} />;
}
