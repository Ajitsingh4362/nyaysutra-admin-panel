import mongoose, { Schema, Document } from 'mongoose';

export interface ITeamMember extends Document {
  name: string;
  slug: string;
  designation: string;       // e.g. "Senior Associate", "Founder & Advocate"
  specialization: string;    // e.g. "Criminal Law, Constitutional Law"
  bio: string;                // short bio / about
  qualification: string;     // e.g. "LL.B., LL.M., UPSC Mains Qualified"
  experience: string;        // e.g. "5+ Years"
  photo: string;
  photoPublicId: string;
  email: string;
  phone: string;
  linkedin: string;
  barCouncilId: string;
  order: number;             // display order (drag/manual)
  featured: boolean;         // show prominently (e.g. Founder)
  status: 'draft' | 'published';
}

const TeamMemberSchema = new Schema<ITeamMember>({
  name: { type: String, required: true },
  slug: { type: String, unique: true },
  designation: { type: String, default: 'Advocate' },
  specialization: { type: String, default: '' },
  bio: { type: String, default: '' },
  qualification: { type: String, default: '' },
  experience: { type: String, default: '' },
  photo: { type: String, default: '' },
  photoPublicId: { type: String, default: '' },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  linkedin: { type: String, default: '' },
  barCouncilId: { type: String, default: '' },
  order: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
  status: { type: String, enum: ['draft', 'published'], default: 'published' },
}, { timestamps: true });

export default mongoose.models.TeamMember || mongoose.model<ITeamMember>('TeamMember', TeamMemberSchema);
