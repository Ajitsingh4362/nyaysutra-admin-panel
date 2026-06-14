import mongoose, { Schema, Document } from 'mongoose';

export interface IGallery extends Document {
  title: string; slug: string; album: string; caption: string;
  description: string; date: Date; location: string; tags: string[];
  images: Array<{ url: string; publicId: string; altText: string }>;
  videoUrl: string; pdfUrl: string; featuredMedia: string;
  visibility: string; featured: boolean; status: string;
  seo: { metaTitle: string; metaDescription: string; keywords: string[] };
}

const GallerySchema = new Schema<IGallery>({
  title: { type: String, required: true }, slug: { type: String, unique: true },
  album: { type: String, default: 'General' }, caption: String,
  description: String, date: { type: Date, default: Date.now }, location: String,
  tags: [String],
  images: [{ url: String, publicId: String, altText: String }],
  videoUrl: { type: String, default: '' }, pdfUrl: { type: String, default: '' },
  featuredMedia: { type: String, default: '' },
  visibility: { type: String, enum: ['public','private','featured'], default: 'public' },
  featured: { type: Boolean, default: false },
  status: { type: String, enum: ['draft','published'], default: 'published' },
  seo: { metaTitle: String, metaDescription: String, keywords: [String] },
}, { timestamps: true });

export default mongoose.models.Gallery || mongoose.model<IGallery>('Gallery', GallerySchema);
