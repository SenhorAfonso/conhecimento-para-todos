import mongoose from 'mongoose';

const coursesSchema = new mongoose.Schema({
  creator: { type: String },
  topic: { type: String },
  title: { type: String },
  description: { type: String },
  src: { type: String },
  rating: { type: String },
  numberOfStudents: { type: String }
});

export default mongoose.model('coursesModel', coursesSchema);