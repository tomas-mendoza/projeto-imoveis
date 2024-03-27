import { Sequelize } from 'sequelize-typescript';
import env from '../env';
import PropertyType from '../models/PropertyType';
import Address from '../models/Address';
import Customer from '../models/Customer';
import Owner from '../models/Owner';
import Property from '../models/Property';
import Broker from '../models/Broker';
import Visit from '../models/Visit';
import History from '../models/History';
import Photo from '../models/Photo';

export default class Database {
  public sequelize: Sequelize | undefined;

  constructor() {
    this.sequelize = new Sequelize(env.DATABASE_NAME, env.DATABASE_USER, env.DATABASE_PASSWORD, {
      dialect: 'mysql',
      host: env.DATABASE_HOST,
      logging: false,
      models: [
        PropertyType,
        Address,
        Customer,
        Owner,
        Property,
        Broker,
        Visit,
        History,
        Photo
      ]
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
