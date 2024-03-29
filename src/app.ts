import Express, { Application } from 'express';
import Database from './config/database';
import addressRouter from './routes/address.router';
import propertyTypeRouter from './routes/propertyType.router';

class App {
  public app: Application;

  constructor() {
    this.app = Express();
    this.plugins();
    this.routes();
    this.connectDatabase();
  }

  protected plugins(): void {
    this.app.use(Express.json());
  }

  routes(): void {
    this.app.use('/address', addressRouter);
    this.app.use('/property-type', propertyTypeRouter);
  }

  protected async connectDatabase() {
    const database = new Database();
    await database.connect();
  }
}

export default new App().app;
