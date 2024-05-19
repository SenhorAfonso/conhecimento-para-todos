import mongoose from 'mongoose';

const questionsSchema = new mongoose.Schema({
  courseId: { type: String },
  questions: { type: String },
  answers: [{ user: mongoose.Types.ObjectId, answer: [String] }]
});

export default mongoose.model('questionsModel', questionsSchema);