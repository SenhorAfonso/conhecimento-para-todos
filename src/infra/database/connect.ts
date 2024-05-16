import ORM from '../../interfaces/database/ORM';

class Database {
  private URI: string;
  private ORM: ORM;

  constructor(ORM: ORM, URI: string) {
    this.ORM = ORM;
    this.URI = URI;
  }

  async connect() {
    try {
      await this.ORM.connect(this.URI);
      console.log('Database connected!');
    } catch (error) {
      throw new Error('Can not connect to database!');
    }
  }
}

export default Database;