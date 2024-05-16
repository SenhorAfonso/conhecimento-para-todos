import server from './server';


class App {

  constructor() {
    this.start();
  }

  private start() {
    // connect to database
    server.listen(3000, () => {
      console.log('Server is listening at 3000 port');
    });
  }



}

new App();