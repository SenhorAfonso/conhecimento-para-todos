import mongoose from 'mongoose';

const questionsSchema = new mongoose.Schema({
  courseId: { type: String },
  questionerInfo: { userId: { type: mongoose.Types.ObjectId, ref: 'userschema' }, userQuestionTitle: { type: String }, userQuestionBody: { type: String } },
  listOfAnswers: [{ userId: { type: mongoose.Types.ObjectId, ref: 'userschema' },  userAnswer: { type: String } }]
});

export default mongoose.model('questionsModel', questionsSchema);