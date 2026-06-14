import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  coverImage: string;
  coverImagePublicId: string;
  author: string;
  tags: string[];
  publishedAt: Date;
  readTime: string;
  featured: boolean;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
  status: 'draft' | 'published';
  views: number;
}

const BlogSchema = new Schema<IBlog>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  excerpt: { type: String },
  content: { type: String },
  coverImage: { type: String, default: '' },
  coverImagePublicId: { type: String, default: '' },
  author: { type: String, default: 'Adv. A.K. Tripathi' },
  tags: [{ type: String }],
  publishedAt: { type: Date, default: Date.now },
  readTime: { type: String, default: '5 min read' },
  featured: { type: Boolean, default: false },
  seo: {
    metaTitle: { type: String, default: '' },
    metaDescription: { type: String, default: '' },
    keywords: [{ type: String }],
  },
  status: { type: String, enum: ['draft', 'published'], default: 'published' },
  views: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);
