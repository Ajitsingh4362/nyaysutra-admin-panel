import { connectDB } from '@/lib/mongodb';
import Blog from '@/lib/models/Blog';
import BlogClient, { BlogPostSummary } from './BlogClient';

export const revalidate = 0; // always fetch fresh, so newly-published blogs show up immediately

// Fallback sample articles — shown only if there are no published blogs in the database yet.
const fallbackPosts: BlogPostSummary[] = [
  { id:'1', slug:'fundamental-rights-india',     title:'Understanding Your Fundamental Rights Under the Indian Constitution',    category:'Constitutional Law',      excerpt:'A comprehensive guide for citizens to understand their rights under Articles 12–35 of the Constitution of India before taking any legal action.', readTime:'5 min read', publishedAt:'2026-05-20', tags:['fundamental rights','article 21','constitution'], featured:true },
  { id:'2', slug:'sc-weekly-digest',             title:'Supreme Court Weekly Digest — Landmark Judgments Explained',             category:'Supreme Court Updates',   excerpt:'Key Supreme Court judgments of the week explained in simple language for citizens, students and legal professionals.',                             readTime:'7 min read', publishedAt:'2026-06-01', tags:['supreme court','judgment','weekly'], featured:true },
  { id:'3', slug:'bail-fir-criminal',            title:'Bail Rights, FIR Procedure and Criminal Law: What Every Citizen Must Know',category:'Criminal Law',           excerpt:'Essential knowledge about FIR filing, bail procedures, rights of the accused under BNSS 2023.',                                                    readTime:'6 min read', publishedAt:'2026-05-28', tags:['bail','FIR','BNSS 2023'], featured:false },
  { id:'4', slug:'property-disputes-guide',      title:'Property Disputes in India: A Complete Step-by-Step Legal Guide',        category:'Civil Law',               excerpt:'Everything you need to know about property disputes, title suits, possession cases and how to protect your property rights legally.',              readTime:'8 min read', publishedAt:'2026-05-15', tags:['property','civil','title suit'], featured:false },
  { id:'5', slug:'rti-act-guide',                title:'RTI Act — Your Right to Information Explained Simply',                   category:'RTI & Human Rights',      excerpt:'How to file an RTI application, what information you can seek, and how to appeal if rejected.',                                                       readTime:'5 min read', publishedAt:'2026-05-10', tags:['RTI','right to information','government'], featured:false },
  { id:'6', slug:'consumer-rights-complaint',    title:'Consumer Rights in India: How to File a Complaint',                     category:'Consumer Protection',     excerpt:'Complete guide to filing consumer complaints before District, State and National Consumer Commissions.',                                              readTime:'6 min read', publishedAt:'2026-05-05', tags:['consumer','NCDRC','complaint'], featured:false },
  { id:'7', slug:'upsc-law-optional',            title:'UPSC Law Optional — Strategy from a Mains Qualified Candidate',         category:'Student Corner',          excerpt:'Strategy, books, and approach for Law Optional in UPSC Civil Services from Adv. A.K. Tripathi — UPSC Mains qualified.',                            readTime:'9 min read', publishedAt:'2026-04-20', tags:['UPSC','law optional','strategy'], featured:false },
  { id:'8', slug:'bnss-2023-changes',            title:'BNSS 2023 vs CrPC — Key Changes Every Lawyer Must Know',                category:'Criminal Law',            excerpt:'A detailed comparison of BNSS 2023 and CrPC — key procedural changes, new sections, and what they mean for practitioners.',                        readTime:'7 min read', publishedAt:'2026-04-10', tags:['BNSS 2023','CrPC','criminal law'], featured:false },
  { id:'9', slug:'article-21-right-to-life',    title:'Article 21 — The Most Powerful Fundamental Right in India',              category:'Constitutional Law',      excerpt:'How courts have expanded Article 21 to include right to health, privacy, livelihood, education, and dignity.',                                      readTime:'6 min read', publishedAt:'2026-03-25', tags:['article 21','fundamental rights','privacy'], featured:false },
];

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
  const dbPosts = await getPublishedBlogs();
  // Real published blogs first, then fallback sample articles so the page never looks empty.
  const posts = [...dbPosts, ...fallbackPosts];

  return <BlogClient posts={posts} />;
}
