import { connectDB } from '@/lib/mongodb';
import Gallery from '@/lib/models/Gallery';
import HomeGalleryMarquee from './HomeGalleryMarquee';

interface GalleryPhoto {
  _id: string;
  url: string;
  alt: string;
}

async function getGalleryPhotos(): Promise<GalleryPhoto[]> {
  try {
    await connectDB();
    const items = await Gallery.find({ status: 'published' }).sort({ date: -1 }).limit(24).lean();
    const photos: GalleryPhoto[] = [];
    for (const item of items as any[]) {
      const first = item.images?.[0];
      if (first?.url) {
        photos.push({
          _id: String(item._id),
          url: first.url,
          alt: first.altText || item.title || 'NyayaSutra Gallery',
        });
      }
    }
    return photos;
  } catch {
    return [];
  }
}

export default async function HomeGallerySection() {
  const photos = await getGalleryPhotos();
  if (photos.length === 0) return null;

  return (
    <section className="section-sm !pb-8">
      <div className="container px-4 mx-auto">
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <p className="tag">Professional Journey</p>
            <h2 className="section-title mt-2">Gallery Highlights</h2>
          </div>
          <a href="/gallery" className="btn-outline shrink-0 text-sm hidden sm:inline-flex">View Gallery</a>
        </div>
      </div>
      <HomeGalleryMarquee photos={photos} />
    </section>
  );
}
