import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IEnrollment {
  course: mongoose.Types.ObjectId;
  enrolledAt: Date;
  amountPaid: number;
  paymentStatus: 'free' | 'paid' | 'pending';
  paymentId?: string;
  progress: {
    completedModules: number[];
    lastAccessedAt?: Date;
  };
}

export interface IStudent extends Document {
  name: string;
  email: string;
  phone: string;
  password: string;
  enrollments: IEnrollment[];
  createdAt: Date;
  comparePassword(pwd: string): Promise<boolean>;
}

const EnrollmentSchema = new Schema<IEnrollment>({
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  enrolledAt: { type: Date, default: Date.now },
  amountPaid: { type: Number, default: 0 },
  paymentStatus: { type: String, enum: ['free', 'paid', 'pending'], default: 'free' },
  paymentId: { type: String, default: '' },
  progress: {
    completedModules: { type: [Number], default: [] },
    lastAccessedAt: { type: Date },
  },
}, { _id: false });

const StudentSchema = new Schema<IStudent>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  phone: { type: String, default: '' },
  password: { type: String, required: true },
  enrollments: { type: [EnrollmentSchema], default: [] },
}, { timestamps: true });

StudentSchema.pre('save', async function (this: any, next: any) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

StudentSchema.methods.comparePassword = async function (pwd: string): Promise<boolean> {
  return bcrypt.compare(pwd, this.password);
};

export default mongoose.models.Student || mongoose.model<IStudent>('Student', StudentSchema);
