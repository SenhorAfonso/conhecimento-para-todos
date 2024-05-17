import { Request, Response } from 'express';
import path from 'node:path';
import HomeService from '../services/homeService';
import homeQueryObject from '../interfaces/home/queryObjetc';

class HomeController {

  static async home(
    req: Request,
    res: Response
  ) {
    const homePageCourses = await HomeService.fetchCourses();
    res.render(path.join(__dirname, '../../views/home/homepage.ejs'), { courses: homePageCourses });
  }

  static async search(
    req: Request,
    res: Response
  ) {
    const { topic, rating, instructorName } = req.query as homeQueryObject;
    const search = req.query['search-course'] as string;
    const query: homeQueryObject = {};

    if (topic) {
      query.topic = topic;
    } else {
      query.topic = search;
    }

    query.instructorName = instructorName;
    query.rating = Number(rating);
    const homePageCourses = await HomeService.searchCourses(query);
    res.render(path.join(__dirname, '../../views/home/search-course.ejs'), { courses: homePageCourses, query });
  }

}

export default HomeController;