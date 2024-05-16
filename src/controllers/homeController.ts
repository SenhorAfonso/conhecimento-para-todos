import { Request, Response } from 'express';
import path from 'node:path';
import HomeService from '../services/homeService';

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
    const { topic } = req.query as { topic: string };
    const search = req.query['search-course'] as string;
    let query: string;

    if (topic) {
      query = topic;
    } else {
      query = search;
    }

    const homePageCourses = await HomeService.searchCourses(query);
    res.render(path.join(__dirname, '../../views/home/search-course.ejs'), { courses: homePageCourses, query });
  }

}

export default HomeController;