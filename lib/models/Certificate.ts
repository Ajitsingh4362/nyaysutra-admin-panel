import mongoose, { Schema, Document } from 'mongoose';

export interface ICertificate extends Document {
  certificateNumber: string;   // e.g. NS-CERT-2026-0001
  studentName: string;
  fatherName: string;
  courseName: string;
  courseType: string;          // e.g. "Internship Program", "Certificate Course"
  duration: string;            // e.g. "3 Months", "15 Jan 2026 - 15 Mar 2026"
  startDate: string;
  endDate: string;
  grade: string;                // e.g. "A+", "Distinction", "Successfully Completed"
  issueDate: string;
  remarks: string;
  signatoryName: string;
  signatoryDesignation: string;
  status: 'active' | 'revoked';
}

const CertificateSchema = new Schema<ICertificate>({
  certificateNumber: { type: String, required: true, unique: true },
  studentName: { type: String, required: true },
  fatherName: { type: String, default: '' },
  courseName: { type: String, required: true },
  courseType: { type: String, default: 'Certificate Course' },
  duration: { type: String, default: '' },
  startDate: { type: String, default: '' },
  endDate: { type: String, default: '' },
  grade: { type: String, default: 'Successfully Completed' },
  issueDate: { type: String, default: '' },
  remarks: { type: String, default: '' },
  signatoryName: { type: String, default: 'Adv. A.K. Tripathi' },
  signatoryDesignation: { type: String, default: 'Founder, NyayaSutra — Legal Intelligence' },
  status: { type: String, enum: ['active', 'revoked'], default: 'active' },
}, { timestamps: true });

export default mongoose.models.Certificate || mongoose.model<ICertificate>('Certificate', CertificateSchema);
