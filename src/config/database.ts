import { Sequelize } from 'sequelize-typescript';
import env from '../env';

export default class Database {
  public sequelize: Sequelize | undefined;

  constructor() {
    this.sequelize = new Sequelize(env.DATABASE_NAME, env.DATABASE_USER, env.DATABASE_PASSWORD, {
      dialect: 'mysql',
      host: env.DATABASE_HOST,
      logging: false
    });
  }

  async connect() {
    try {
      await this.sequelize?.authenticate();
      await this.sequelize?.sync();

      console.log('The connection has been estabilished successfully!');
    } catch(err: unknown) {
      console.error(err);
    }
  }
}
