import { Schema,  model, Document } from 'mongoose';

const courseSchema = new Schema({
  title:          String,
  studentQnt:     Number,
  price:          Number,
  teacher:        String,
  description:    String

}, { timestamps: true });

export interface CourseDocument extends Document {
  title?:       string | null,
  studentQnt?:  number | null,
  price?:       number | null,
  teacher?:     string | null,
  description?: string | null
}

export default model('Courses', courseSchema);