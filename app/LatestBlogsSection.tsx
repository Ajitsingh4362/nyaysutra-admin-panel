import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { connectDB } from '@/lib/mongodb';
import Blog from '@/lib/models/Blog';

interface BlogItem {
  _id: string; title: string; category: string; excerpt: string;
  coverImage: string; readTime: string; slug: string;
}

async function getLatestBlogs(): Promise<BlogItem[]> {
  try {
    await connectDB();
    const blogs = await Blog.find({ status: 'published' }).sort({ publishedAt: -1 }).limit(18).lean();
    return blogs.map((b: any) => ({
      _id: String(b._id),
      title: b.title,
      category: b.category || 'Legal Article',
      excerpt: b.excerpt || '',
      coverImage: b.coverImage || '',
      readTime: b.readTime || '5 min read',
      slug: b.slug,
    }));
  } catch {
    return [];
  }
}

export default async function LatestBlogsSection() {
  const blogs = await getLatestBlogs();
  if (blogs.length === 0) return null;

  return (
    <section className="section section-light">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="tag">Legal Intelligence</p>
            <h2 className="section-title mt-2">Latest Articles</h2>
          </div>
          <Link href="/blog" className="btn-outline shrink-0 text-sm">All Articles <ArrowRight size={13}/></Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {blogs.map((blog) => (
            <Link key={blog._id} href={`/blog/${blog.slug}`} className="card-link group">
              {blog.coverImage && (
                <div className="aspect-[16/9] rounded-lg overflow-hidden mb-3">
                  <img src={blog.coverImage} alt={blog.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                </div>
              )}
              <span className="text-[10px] font-bold text-[var(--gold)] uppercase tracking-widest bg-[rgba(201,168,76,0.1)] px-3 py-1 rounded-full">{blog.category}</span>
              <h3 className="font-display text-lg font-semibold leading-snug mt-3 group-hover:text-[var(--gold)] transition-colors line-clamp-2">{blog.title}</h3>
              <p className="text-[var(--muted2)] text-sm mt-2 leading-relaxed line-clamp-3">{blog.excerpt}</p>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-[rgba(201,168,76,0.1)]">
                <span className="text-xs text-[var(--muted2)]">{blog.readTime}</span>
                <span className="text-[var(--gold)] text-xs font-semibold inline-flex items-center gap-1">Read <ChevronRight size={11}/></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
