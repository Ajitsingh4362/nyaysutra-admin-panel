'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronRight, RefreshCw } from 'lucide-react';

interface Blog {
  _id: string; title: string; category: string; excerpt: string;
  readTime: string; slug: string; publishedAt?: string;
}

export default function LatestBlogsSection() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blogs', { cache: 'no-store' })
      .then(r => r.json())
      .then(d => setBlogs(Array.isArray(d) ? d.slice(0, 3) : []))
      .catch(() => setBlogs([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="section section-light">
        <div className="container px-4 mx-auto text-center py-10">
          <RefreshCw size={22} className="animate-spin inline text-[var(--muted2)]"/>
        </div>
      </section>
    );
  }

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
