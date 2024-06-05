import sequelize from './sequelize';

class Database {
  constructor() {
    this.connect();
  }

  private async connect() {
    try {
      await sequelize.authenticate();
      console.log('Database connected!');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }
}

export default Database;
