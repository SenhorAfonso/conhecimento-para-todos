import { Schema, model, Document } from 'mongoose';

const userSchema = new Schema({
  fullName: { type: String },
  username: { type: String },
  profilePic: { type: String },
  email: { type: String },
  password: { type: String }
}, { timestamps: true });

export interface UserDocument extends Document {
  fullName?: string | null,
  username?: string | null,
  profilePic?: string | null,
  email?: string | null,
  password?: string | null
}

export default model('User', userSchema);