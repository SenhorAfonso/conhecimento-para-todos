import mongoose from 'mongoose';

const questionsSchema = new mongoose.Schema({
  courseId: { type: String },
  questionerInfo: { userId: { type: Number }, userQuestionTitle: { type: String }, userQuestionBody: { type: String } },
  listOfAnswers: [{ userId: { type: Number },  userAnswer: { type: String } }]
});

export default mongoose.model('questionsModel', questionsSchema);