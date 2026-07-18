import { MetadataRoute } from 'next';
import { connectDB } from '@/lib/mongodb';
import Blog from '@/lib/models/Blog';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

const base = 'https://nyayasutra.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: base, priority: 1.0, changeFrequency: 'weekly', lastModified: new Date() },
    { url: `${base}/about`, priority: 0.9, changeFrequency: 'monthly', lastModified: new Date() },
    { url: `${base}/team`, priority: 0.8, changeFrequency: 'monthly', lastModified: new Date() },
    { url: `${base}/practice-areas`, priority: 0.9, changeFrequency: 'monthly', lastModified: new Date() },
    { url: `${base}/courts`, priority: 0.8, changeFrequency: 'monthly', lastModified: new Date() },
    { url: `${base}/services`, priority: 0.8, changeFrequency: 'monthly', lastModified: new Date() },
    { url: `${base}/courses`, priority: 0.9, changeFrequency: 'weekly', lastModified: new Date() },
    { url: `${base}/students`, priority: 0.8, changeFrequency: 'weekly', lastModified: new Date() },
    { url: `${base}/gallery`, priority: 0.7, changeFrequency: 'monthly', lastModified: new Date() },
    { url: `${base}/blog`, priority: 0.8, changeFrequency: 'weekly', lastModified: new Date() },
    { url: `${base}/contact`, priority: 0.8, changeFrequency: 'yearly', lastModified: new Date() },
    { url: `${base}/verify`, priority: 0.5, changeFrequency: 'yearly', lastModified: new Date() },
    { url: `${base}/practice-areas/supreme-court`, priority: 0.8, changeFrequency: 'monthly', lastModified: new Date() },
    { url: `${base}/practice-areas/high-court`, priority: 0.8, changeFrequency: 'monthly', lastModified: new Date() },
    { url: `${base}/practice-areas/criminal-law`, priority: 0.8, changeFrequency: 'monthly', lastModified: new Date() },
    { url: `${base}/practice-areas/civil-law`, priority: 0.8, changeFrequency: 'monthly', lastModified: new Date() },
    { url: `${base}/practice-areas/constitutional-law`, priority: 0.8, changeFrequency: 'monthly', lastModified: new Date() },
    { url: `${base}/practice-areas/family-matrimonial`, priority: 0.7, changeFrequency: 'monthly', lastModified: new Date() },
    { url: `${base}/practice-areas/corporate-commercial`, priority: 0.7, changeFrequency: 'monthly', lastModified: new Date() },
    { url: `${base}/practice-areas/arbitration-adr`, priority: 0.7, changeFrequency: 'monthly', lastModified: new Date() },
    { url: `${base}/practice-areas/cyber-law`, priority: 0.7, changeFrequency: 'monthly', lastModified: new Date() },
    { url: `${base}/practice-areas/rti-human-rights`, priority: 0.7, changeFrequency: 'monthly', lastModified: new Date() },
    { url: `${base}/practice-areas/legal-research`, priority: 0.7, changeFrequency: 'monthly', lastModified: new Date() },
  ];

  let blogPages: MetadataRoute.Sitemap = [];
  try {
    await connectDB();
    const blogs = await Blog.find({ status: 'published' }).select('slug updatedAt publishedAt').lean();
    blogPages = blogs.map((b: any) => ({
      url: `${base}/blog/${b.slug}`,
      priority: 0.6,
      changeFrequency: 'monthly' as const,
      lastModified: b.updatedAt || b.publishedAt || new Date(),
    }));
  } catch {
    // If the DB is briefly unreachable, fall back to static pages only rather than failing the whole sitemap.
  }

  let coursePages: MetadataRoute.Sitemap = [];
  try {
    const sb = supabaseAdmin();
    const { data: courses } = await sb.from('courses').select('slug, id, updated_at').eq('status', 'published');
    coursePages = (courses || []).map((c: any) => ({
      url: `${base}/students/${c.slug || c.id}`,
      priority: 0.7,
      changeFrequency: 'weekly' as const,
      lastModified: c.updated_at || new Date(),
    }));
  } catch {
    // Same fallback as above — sitemap should never hard-fail because Supabase is briefly unreachable.
  }

  return [...staticPages, ...blogPages, ...coursePages];
}
