import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IAdmin extends Document {
  email: string;
  password: string;
  name: string;
  comparePassword(pwd: string): Promise<boolean>;
}

const AdminSchema = new Schema<IAdmin>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, default: 'Admin' },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(AdminSchema as any).pre('save', async function(this: any, next: any) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

AdminSchema.methods.comparePassword = async function(pwd: string): Promise<boolean> {
  return bcrypt.compare(this.password, pwd);
};

export default mongoose.models.Admin || mongoose.model<IAdmin>('Admin', AdminSchema);
