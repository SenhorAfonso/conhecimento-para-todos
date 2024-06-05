import ORM from '../../interfaces/database/ORM';
import sequelize from './sequelize';

class Database {
  constructor(
    private ORM: ORM,
    private URI: string
  ) {
    this.ORM = ORM;
    this.URI = URI;
  }

  async connect() {
    try {
      await this.ORM.connect(this.URI);
      await sequelize.authenticate();
      console.log('Database connected!');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }
}

export default Database;
