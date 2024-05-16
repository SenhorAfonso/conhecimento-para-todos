import HomeRepository from '../repository/homeRepository';

class HomeService {

  static async fetchCourses() {
    const result = await HomeRepository.fetchCourses();
    return result;
  }

  static async searchCourses(query: string) {
    const result = await HomeRepository.searchCourses(query);
    return result;
  }

}

export default HomeService;