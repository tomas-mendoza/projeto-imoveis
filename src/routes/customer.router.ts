import customerController from '../controllers/customer.controller';
import validateSchema from '../middlewares/validate.schema';
import { getOrDeleteSchema } from '../schemas/generic.schema';
import { createPersonSchema, updatePersonSchema } from '../schemas/person.schema';
import BaseRouter from './base.router';

class CustomerRouter extends BaseRouter {
  routes(): void {
    this.router.post('', validateSchema(createPersonSchema), customerController.create);
    this.router.patch('/:id', validateSchema(updatePersonSchema), customerController.update);
    this.router.delete('/:id', validateSchema(getOrDeleteSchema), customerController.delete);
    this.router.get('', customerController.getAll);
    this.router.get('/:id', validateSchema(getOrDeleteSchema), customerController.getById);
  }
}

export default new CustomerRouter().router;
