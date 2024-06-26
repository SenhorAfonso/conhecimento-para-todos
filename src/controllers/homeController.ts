import { Request, Response } from 'express';
import path from 'node:path';
import HomeService from '../services/homeService';
import homeQueryObject from '../interfaces/home/queryObjetc';
import AuthenticatedRequest from '../types/AuthMiddleware/AuthenticatedRequest';

class HomeController {

  static async home(
    req: AuthenticatedRequest,
    res: Response
  ) {
    const homePageCourses = await HomeService.fetchCourses();
    res.render(path.join(__dirname, '../../views/home/homepage.ejs'), { courses: homePageCourses });
  }

  static login(
    req: Request,
    res: Response
  ) {
    res.render(path.join(__dirname, '../../views/home/login.ejs'));
  }

  static async search(
    req: AuthenticatedRequest,
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

  static async watching(
    req: AuthenticatedRequest,
    res: Response
  ) {
    const { src } = req.query as { src: string };
    const videoId = src.replace('https://youtu.be/', '');

    const courseDetails = await HomeService.fetchCourseData(videoId);
    res.render(path.join(__dirname, '../../views/course/watching.ejs'), { courseDetails });
  }

}

export default HomeController;