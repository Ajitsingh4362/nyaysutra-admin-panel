import mongoose, { Schema, Document } from 'mongoose';

export interface ICourse extends Document {
  title: string; slug: string; shortSummary: string; fullDescription: string;
  level: string; duration: string; language: string; instructor: string;
  coverImage: string; coverImagePublicId: string; fee: number; isFree: boolean;
  modules: Array<{
    title: string; description: string; pdfUrl: string; videoUrl: string;
    audioUrl: string; attachments: string[]; order: number; published: boolean;
  }>;
  learningOutcomes: string[]; prerequisites: string[];
  hasCertificate: boolean; status: string; featured: boolean;
  seo: { metaTitle: string; metaDescription: string; keywords: string[] };
  relatedCourses: string[];
}

const ModuleSchema = new Schema({
  title: String, description: String, pdfUrl: { type: String, default: '' },
  videoUrl: { type: String, default: '' }, audioUrl: { type: String, default: '' },
  attachments: [String], order: { type: Number, default: 0 },
  published: { type: Boolean, default: true },
});

const CourseSchema = new Schema<ICourse>({
  title: { type: String, required: true }, slug: { type: String, unique: true },
  shortSummary: String, fullDescription: String,
  level: { type: String, enum: ['Beginner','Intermediate','Advanced'], default: 'Beginner' },
  duration: { type: String, default: '' }, language: { type: String, default: 'Hindi / English' },
  instructor: { type: String, default: 'Adv. A.K. Tripathi' },
  coverImage: { type: String, default: '' }, coverImagePublicId: { type: String, default: '' },
  fee: { type: Number, default: 0 }, isFree: { type: Boolean, default: true },
  modules: [ModuleSchema], learningOutcomes: [String], prerequisites: [String],
  hasCertificate: { type: Boolean, default: false },
  status: { type: String, enum: ['draft','published','scheduled'], default: 'published' },
  featured: { type: Boolean, default: false },
  seo: { metaTitle: String, metaDescription: String, keywords: [String] },
  relatedCourses: [String],
}, { timestamps: true });

export default mongoose.models.Course || mongoose.model<ICourse>('Course', CourseSchema);
