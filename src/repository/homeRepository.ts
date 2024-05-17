import mongoose from 'mongoose';
import coursesModel from '../schema/courses/coursesSchema';
import homeQueryObject from '../interfaces/home/queryObjetc';

class HomeRepository {

  static async fetchCourses() {
    const result = await coursesModel.aggregate([
      { $sort: { title: 1 } },
      {
        $group: {
          _id: '$topic', topCourses: {
            $push: '$$ROOT'
          }
        }
      },
      {
        $project: {
          _id: 0,
          topic: '$_id',
          topCourses: {
            $slice: ['$topCourses', 5]
          }
        }
      }
    ]);

    return result;
  }

  static async searchCourses(query: homeQueryObject) {
    if (!query.rating) {
      query.rating = 0;
    }

    let result: mongoose.Document[] | null = [];

    result = await coursesModel.find({
      $and: [
        { avgRating: { $gte: query.rating } },
        {
          $or: [
            { creator: { $regex: `.*${query.instructorName}.*`, $options: 'i' } },
            { title: { $regex: `.*${query.topic}.*`, $options: 'i' } },
            { topic: { $regex: `.*${query.topic}.*`, $options: 'i' } }
          ]
        }
      ]
    });

    return result;
  }

}

export default HomeRepository;