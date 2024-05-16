import coursesModel from '../models/coursesModel';
import mongoose from 'mongoose';

class HomeRepository {

  static async fetchCourses() {
    const result = await coursesModel.aggregate([
      { $sort: { title: 1 } },
      { $group: {
        _id: '$topic', topCourses: {
          $push: '$$ROOT'
        } }
      },
      { $project: {
        _id: 0,
        topic: '$_id',
        topCourses: {
          $slice: ['$topCourses', 5]
        } }
      }
    ]);

    return result;
  }

  static async searchCourses(query: string) {
    let result: mongoose.Document[] | null;

    result = await coursesModel.find({ title: { $regex: `.*${query}.*`, $options: 'i' } });

    if (result.length === 0) {
      result = await coursesModel.find({ topic: { $regex: `.*${query}.*`, $options: 'i' } });
    }

    return result;
  }

}

export default HomeRepository;