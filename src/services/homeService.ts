import HomeRepository from '../repository/homeRepository';
import homeQueryObject from '../interfaces/home/queryObjetc';
import instructorSchema from '../schema/instructorSchema';
import questionsSchema from '../schema/questionsSchema';
import userRepository from '../repository/users/userRepository';

class HomeService {

  static async fetchCourses() {
    const result = await HomeRepository.fetchCourses();
    return result;
  }

  static async searchCourses(query: homeQueryObject) {
    const result = await HomeRepository.searchCourses(query);
    return result;
  }

  static async fetchCourseData(courseId: string) {
    const course = await HomeRepository.fetchCourseData(courseId);
    const courseSrc = course.src;
    const courseTOC = course.tableOfContents;

    const courseInstructorId = course.instructor;
    const courseInstructorDetails = await instructorSchema.findById(courseInstructorId);

    const courseQuestions = await questionsSchema.find({ courseId });
    const courseQuestionsData = await this.clearCourseQuestion(courseQuestions);

    return {
      courseSrc: courseId,
      courseTOC,
      courseInstructorDetails,
      courseQuestionsData
    };
  }

  static async clearCourseQuestion(questionList: any[]) {
    const questionData: { userImg?: string; username?: string; questionTitle?: string, questionBody?: string, answers?: object[] } = {};
    const allQuestions: any[] = []

    await Promise.all(questionList.map(async questionObject => {
      const { userImg, username } = await this.getUserData(questionObject.questionerInfo.userId);
      questionData.userImg = userImg!;
      questionData.username = username!;
      questionData.questionTitle = questionObject.questionerInfo.userQuestionTitle;
      questionData.questionBody = questionObject.questionerInfo.userQuestionBody;
      questionData.answers = await this.getAnswers(questionObject.listOfAnswers);

      allQuestions.push(questionData);
    }));

    return allQuestions;
  }

  static async getUserData(userId: string) {
    const questionerData = await userRepository.getUserById(userId);
    const userImg = questionerData!.profilePic;
    const { username } = questionerData!;
    return { userImg, username };
  }

  static async getAnswers(listOfAnswers: {userId: string, userAnswer: string}[]) {
    const allAnswers: any[] = [];

    await Promise.all(listOfAnswers.map(async answerObject => {
      const { userImg, username } = await this.getUserData(answerObject.userId);
      const { userAnswer } = answerObject;

      allAnswers.push({ userImg, username, userAnswer });
    }));

    return allAnswers;
  }

}

export default HomeService;