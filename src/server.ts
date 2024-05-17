import express from 'express';
import path from 'node:path';
import homeRouter from './routes/homeRoutes';

class Server {
  public server: express.Application;

  constructor() {
    this.server = express();
    this.middlewares();
  }

  private middlewares() {
    this.server.use(express.json());
    this.server.use(express.static(path.join(__dirname, '../public')));
    this.server.set('view engine', 'ejs');
    this.server.set('views', path.join(__dirname, '../views'));
    this.server.use('', homeRouter);
    this.server.use('/courses', homeRouter);
  }

}

export default new Server().server;