import HomeRepository from '../repository/homeRepository';
import homeQueryObject from '../interfaces/home/queryObjetc';

class HomeService {

  static async fetchCourses() {
    const result = await HomeRepository.fetchCourses();
    return result;
  }

  static async searchCourses(query: homeQueryObject) {
    const result = await HomeRepository.searchCourses(query);
    return result;
  }

}

export default HomeService;