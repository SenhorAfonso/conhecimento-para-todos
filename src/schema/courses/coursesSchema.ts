import mongoose from 'mongoose';

const coursesSchema = new mongoose.Schema({
  creator: { type: String },
  topic: { type: String },
  title: { type: String },
  description: { type: String },
  src: { type: String },
  avgRating: { type: Number },
  ratingQtd: { type: Number },
  numberOfStudents: { type: String }
});

export default mongoose.model('coursesModel', coursesSchema);