import { connectDB } from '@/lib/mongodb';
import Gallery from '@/lib/models/Gallery';
import GalleryClient, { GalleryItem } from './GalleryClient';

export const revalidate = 0;

async function getPublishedGallery(): Promise<GalleryItem[]> {
  try {
    await connectDB();
    const items = await Gallery.find({ status: 'published' }).sort({ date: -1 }).lean();
    return items.map((i: any) => ({
      _id: String(i._id),
      title: i.title,
      album: i.album || 'General',
      caption: i.caption || '',
      description: i.description || '',
      images: i.images || [],
      videoUrl: i.videoUrl || '',
      featured: !!i.featured,
      date: i.date ? new Date(i.date).toISOString() : new Date().toISOString(),
    }));
  } catch {
    return [];
  }
}

export default async function GalleryPage() {
  const items = await getPublishedGallery();
  return <GalleryClient items={items} />;
}
