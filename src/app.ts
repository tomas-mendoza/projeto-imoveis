import Express, { Application } from 'express';
import Database from './config/database';

class App {
  public app: Application;

  constructor() {
    this.app = Express();
    this.plugins();
    this.connectDatabase();
  }

  protected plugins(): void {
    this.app.use(Express.json());
  }

  protected async connectDatabase() {
    const database = new Database();
    await database.connect();
  }
}

export default new App().app;
