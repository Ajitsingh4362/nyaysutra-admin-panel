import Link from 'next/link';
import { ArrowLeft, Clock, User, ChevronRight, MessageCircle } from 'lucide-react';
import { connectDB } from '@/lib/mongodb';
import Blog from '@/lib/models/Blog';


const related = [
  { title:'Practice Areas', href:'/practice-areas' },
  { title:'Students Section', href:'/students' },
  { title:'Courts & Jurisdiction', href:'/courts' },
  { title:'Contact Us', href:'/contact' },
];

export default async function BlogPost({ params }: { params: { slug: string } }) {
  let post: any = null;

  if (!post) {
    try {
      await connectDB();

      let dbPost: any = await Blog.findOne({
        slug: params.slug,
      }).lean();

      if (!dbPost && /^[0-9a-fA-F]{24}$/.test(params.slug)) {
        dbPost = await Blog.findById(params.slug).lean();
      }

      if (dbPost) {
        post = {
          title: dbPost.title || 'Untitled Article',
          category: dbPost.category || 'Legal Article',
          coverImage: dbPost.coverImage || '',
          author: dbPost.author || 'Adv. A.K. Tripathi',
          publishedAt: dbPost.publishedAt || dbPost.createdAt || new Date(),
          readTime: dbPost.readTime || '5 min read',
          tags: dbPost.tags || [],
          content: dbPost.content || '',
        };
      }
    } catch (error) {
      console.error('Blog detail fetch error:', error);
    }
  }

  if (!post) return (
    <main className="section overflow-x-hidden">
      <div className="container mx-auto px-4 text-center">
        <h1 className="section-title">Article Not Found</h1>
        <p className="muted mt-3">This article may have been moved or the URL is incorrect.</p>
        <Link href="/blog" className="btn-gold mt-6">Back to Blog</Link>
      </div>
    </main>
  );

  return (
    <main className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative py-14 px-4 bg-[#EFE7D6] overflow-hidden">
        <div className="container mx-auto relative z-10">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-[var(--muted2)] hover:text-[var(--gold)] mb-6 transition-colors">
            <ArrowLeft size={14}/> All Articles
          </Link>
          <span className="text-[10px] font-bold text-[var(--gold)] uppercase tracking-widest bg-[rgba(201,168,76,0.1)] px-3 py-1 rounded-full">{post.category}</span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold mt-4 leading-tight max-w-4xl">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-4 mt-5">
            <span className="flex items-center gap-1.5 text-sm text-[var(--muted2)]"><User size={13}/> {post.author}</span>
            <span className="flex items-center gap-1.5 text-sm text-[var(--muted2)]"><Clock size={13}/> {post.readTime}</span>
            <span className="text-sm text-[var(--muted2)]">{new Date(post.publishedAt).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'})}</span>
          </div>
        </div>
      </section>

      {/* Cover Image */}
      {post.coverImage && (
        <section className="px-4 pt-10">
          <div className="container mx-auto">
            <div className="aspect-[16/7] rounded-2xl overflow-hidden bg-[#EFE7D6] flex items-center justify-center">
              <img src={post.coverImage} alt={post.title} className="w-full h-full object-contain"/>
            </div>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="section">
        <div className="container px-4 mx-auto grid lg:grid-cols-[1fr_300px] gap-10">
          <article>
            <div
              className="prose-legal"
              style={{ color:'var(--muted)', lineHeight:'1.9', fontSize:'1.0625rem' }}
              dangerouslySetInnerHTML={{ __html: String(post.content || '')
                .replace(/<h2>/g, '<h2 style="font-family:Cormorant Garamond,serif;font-size:1.75rem;font-weight:700;color:#F5F0E8;margin:2rem 0 1rem;padding-bottom:0.5rem;border-bottom:1px solid rgba(201,168,76,0.15)">')
                .replace(/<h3>/g, '<h3 style="font-family:Cormorant Garamond,serif;font-size:1.3rem;font-weight:700;color:#C9A84C;margin:1.5rem 0 0.75rem">')
                .replace(/<ul>/g, '<ul style="list-style:disc;padding-left:1.5rem;margin:0.75rem 0;color:var(--muted)">')
                .replace(/<blockquote>/g, '<blockquote style="border-left:3px solid #C9A84C;padding-left:1rem;margin:1.5rem 0;font-style:italic;color:#C5BBAB">')
                .replace(/<strong>/g, '<strong style="color:#F5F0E8;font-weight:700">')
                .replace(/<em>/g, '<em style="color:#C9A84C;font-style:italic">')
              }}
            />

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-[rgba(201,168,76,0.12)]">
              {post.tags?.map((t: string) => (
                <span key={t} className="text-xs px-3 py-1.5 rounded-full border border-[rgba(201,168,76,0.2)] text-[var(--muted2)]">#{t}</span>
              ))}
            </div>

            {/* Share */}
            <div className="mt-6 p-5 card">
              <p className="font-semibold text-sm mb-3">Found this helpful?</p>
              <p className="text-xs text-[var(--muted2)] mb-4">Share this article with someone who needs it. Or contact us for a consultation.</p>
              <div className="flex flex-wrap gap-3">
                <a href="https://wa.me/919971950371" target="_blank" className="btn-gold text-sm py-2 px-4"><MessageCircle size={13}/> WhatsApp Consult</a>
                <Link href="/contact" className="btn-outline text-sm py-2 px-4">Book Appointment</Link>
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-5">
            <div className="card sticky top-24">
              <h3 className="font-display text-lg font-semibold text-[var(--gold)] mb-4">Need Legal Help?</h3>
              <p className="muted text-sm leading-relaxed">Have questions about this topic? Consult directly with Adv. A.K. Tripathi.</p>
              <a href="https://wa.me/919971950371" target="_blank" className="btn-gold mt-4 w-full justify-center text-sm"><MessageCircle size={13}/> WhatsApp Now</a>
              <Link href="/contact" className="btn-outline mt-3 w-full justify-center text-sm">Book Consultation</Link>
              <div className="mt-5 pt-4 border-t border-[rgba(201,168,76,0.1)]">
                <p className="text-xs font-semibold text-[var(--gold)] mb-3">Quick Links</p>
                <div className="space-y-2">
                  {related.map(r => (
                    <Link key={r.href} href={r.href} className="flex items-center gap-2 text-xs text-[var(--muted2)] hover:text-[var(--gold)] transition-colors">
                      <ChevronRight size={10} className="text-[var(--gold)] shrink-0"/>{r.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="card bg-gradient-to-br from-[rgba(201,168,76,0.07)] to-transparent">
              <h3 className="font-display text-lg font-semibold mb-2">Legal Intelligence</h3>
              <p className="muted text-xs mb-3">Get weekly legal updates, Supreme Court digests and legal awareness articles.</p>
              <Link href="/contact" className="btn-outline text-xs py-2 px-4">Subscribe Free</Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}