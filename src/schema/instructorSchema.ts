import mongoose from 'mongoose';

const instructorSchema = new mongoose.Schema({
  fullName: { type: String, require: [true, 'fullName field is required.'] },
  profilePic: { type: String, require: [true, 'Profile pic is required.'] },
  profileShortBio: { type: String, require: [true, 'Profile short bio is required.'] },
  profileLongBio: { type: String, require: [true, 'Profile long bio is required.'] },
  instructorExperience: { type: String, require: [true, 'Instructor experience is required.'] },
  instructorRating: { type: Number, require: [true, 'Instructor rating is requried.'] },
  instructorQtdOfRating: { type: Number, require: [true, 'Instructor quantity of rating is required.'] },
  instructorQtdOfStudents: { type: Number, require: [true, 'Instructor quantity of studentes is required.'] },
  instructorQtdOfCourses: { type: Number, require: [true, 'Instructor quantity of courses is required.'] },
});

export default mongoose.model('instructorModel', instructorSchema);