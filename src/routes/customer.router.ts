import customerController from '../controllers/customer.controller';
import visitController from '../controllers/visit.controller';
import validateSchema from '../middlewares/validate.schema';
import { getOrDeleteSchema } from '../schemas/generic.schema';
import { createPersonSchema, updatePersonSchema } from '../schemas/person.schema';
import { getByCostumerIdAndPropertyIdSchema } from '../schemas/visit.schema';
import BaseRouter from './base.router';

class CustomerRouter extends BaseRouter {
  routes(): void {
    this.router.post('', validateSchema(createPersonSchema), customerController.create);
    this.router.patch('/:id', validateSchema(updatePersonSchema), customerController.update);
    this.router.delete('/:id', validateSchema(getOrDeleteSchema), customerController.delete);
    this.router.get('', customerController.getAll);
    this.router.get('/:id', validateSchema(getOrDeleteSchema), customerController.getById);
    this.router.get('/:id/visits', validateSchema(getOrDeleteSchema), visitController.getByCustomerId);
    this.router.get('/:customer_id/visits/:property_id', validateSchema(getByCostumerIdAndPropertyIdSchema), visitController.getByCustomerIdAndPropertyId);
  }
}

export default new CustomerRouter().router;
