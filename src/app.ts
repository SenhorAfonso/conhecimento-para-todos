import mongoose from 'mongoose';
import server from './server';
import Database from './infra/database/connect';
import serverConfig from './config/serverConfig';

class App {
  private serverPort: number = Number(serverConfig.SERVER_PORT!);
  private databaseURI: string = serverConfig.DATABASE_URI!;

  constructor() {
    this.start();
  }

  private async start() {
    await new Database(mongoose, this.databaseURI).connect();
    server.listen(this.serverPort, () => {
      console.log(`Server is listening at ${this.serverPort} port`);
    });
  }

}

new App();