import 'express-async-errors';
import express from 'express';
import path from 'node:path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import homeRouter from './routes/homeRoutes';
import userRouter from './routes/userRoutes';
import ErrorHandlingMiddleware from './middleware/ErrorHandlingMiddleware';

class Server {
  public server: express.Application;

  constructor() {
    this.server = express();
    this.middlewares();
  }

  private middlewares() {
    this.server.use(express.json());
    this.server.use(express.static(path.join(__dirname, '../public')));
    this.server.use(bodyParser.urlencoded({ extended: true }));
    this.server.use(cookieParser());
    this.server.set('view engine', 'ejs');
    this.server.set('views', path.join(__dirname, '../views'));
    this.server.use('/', homeRouter);
    this.server.use('/courses', homeRouter);
    this.server.use('/user', userRouter);
    this.server.use(ErrorHandlingMiddleware.errorHandler);
  }

}

export default new Server().server;