import mongoose, { Schema, Document } from 'mongoose';

export interface IInquiry extends Document {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  contactMethod: string;
  status: 'new' | 'read' | 'replied' | 'closed';
  notes: string;
  createdAt: Date;
}

const InquirySchema = new Schema<IInquiry>({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, default: '' },
  service: { type: String, default: 'General' },
  message: { type: String },
  contactMethod: { type: String, default: 'WhatsApp' },
  status: { type: String, enum: ['new', 'read', 'replied', 'closed'], default: 'new' },
  notes: { type: String, default: '' },
}, { timestamps: true });

export default mongoose.models.Inquiry || mongoose.model<IInquiry>('Inquiry', InquirySchema);
