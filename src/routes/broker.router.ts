import brokerController from '../controllers/broker.controller';
import validateSchema from '../middlewares/validate.schema';
import { getOrDeleteSchema } from '../schemas/generic.schema';
import { createPersonSchema, updatePersonSchema } from '../schemas/person.schema';
import BaseRouter from './base.router';

class BrokerRouter extends BaseRouter {
  routes(): void {
    this.router.post('', validateSchema(createPersonSchema), brokerController.create);
    this.router.patch('/:id', validateSchema(updatePersonSchema), brokerController.update);
    this.router.delete('/:id', validateSchema(getOrDeleteSchema), brokerController.delete);
    this.router.get('', brokerController.getAll);
    this.router.get('/:id', validateSchema(getOrDeleteSchema), brokerController.getById);
  }
}

export default new BrokerRouter().router;
