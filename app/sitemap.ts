import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://nyayasutra.com';
  const pages = [
    { url: base, priority: 1.0 },
    { url: `${base}/about`, priority: 0.9 },
    { url: `${base}/team`, priority: 0.8 },
    { url: `${base}/practice-areas`, priority: 0.9 },
    { url: `${base}/courts`, priority: 0.8 },
    { url: `${base}/services`, priority: 0.8 },
    { url: `${base}/students`, priority: 0.8 },
    { url: `${base}/gallery`, priority: 0.7 },
    { url: `${base}/blog`, priority: 0.8 },
    { url: `${base}/contact`, priority: 0.8 },
    { url: `${base}/verify`, priority: 0.5 },
    { url: `${base}/practice-areas/supreme-court`, priority: 0.8 },
    { url: `${base}/practice-areas/high-court`, priority: 0.8 },
    { url: `${base}/practice-areas/criminal-law`, priority: 0.8 },
    { url: `${base}/practice-areas/civil-law`, priority: 0.8 },
    { url: `${base}/practice-areas/constitutional-law`, priority: 0.8 },
    { url: `${base}/practice-areas/family-matrimonial`, priority: 0.7 },
    { url: `${base}/practice-areas/corporate-commercial`, priority: 0.7 },
    { url: `${base}/practice-areas/arbitration-adr`, priority: 0.7 },
    { url: `${base}/practice-areas/cyber-law`, priority: 0.7 },
    { url: `${base}/practice-areas/rti-human-rights`, priority: 0.7 },
    { url: `${base}/practice-areas/legal-research`, priority: 0.7 },
  ];
  return pages.map(p => ({
    url: p.url,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: p.priority,
  }));
}
