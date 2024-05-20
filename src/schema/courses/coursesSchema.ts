import mongoose from 'mongoose';

const coursesSchema = new mongoose.Schema({
  instructor: { type: mongoose.Types.ObjectId, ref: 'instructorSchema' },
  topic: { type: String },
  title: { type: String },
  description: { type: String },
  src: { type: String },
  id: { type: String },
  thumbnail: { type: String },
  tableOfContents: [{ title: { type: String }, duration: { type: Number }, checked: { type: Boolean } }],
  avgRating: { type: Number },
  ratingQtd: { type: Number },
  numberOfStudents: { type: Number },
  questions: { type: mongoose.Types.ObjectId, ref: 'questionsSchema' }
});

export default mongoose.model('coursesModel', coursesSchema);