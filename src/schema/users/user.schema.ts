import { Schema, model, Document } from 'mongoose';

const userSchema = new Schema({
  name:       String,
  birth:      String,
  email:      String,
  password:   String
}, { timestamps: true });

export interface UserDocument extends Document {
  name?:       string | null,
  birth?:      string | null,
  email?:      string | null,
  password?:   string | null
}

export default model('User', userSchema);