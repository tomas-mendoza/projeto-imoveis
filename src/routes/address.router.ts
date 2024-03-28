import addressController from '../controllers/address.controller';
import validateSchema from '../middlewares/validate.schema';
import { createAddressSchema, updateAddressSchema } from '../schemas/address.schema';
import { getOrDeleteSchema } from '../schemas/generic.schema';
import BaseRouter from './base.router';

class AddressRouter extends BaseRouter {
  routes(): void {
    this.router.post('', validateSchema(createAddressSchema), addressController.create);
    this.router.patch('/:id', validateSchema(updateAddressSchema), addressController.update);
    this.router.delete('/:id', validateSchema(getOrDeleteSchema), addressController.delete);
    this.router.get('', addressController.getAll);
    this.router.get('/:id', validateSchema(getOrDeleteSchema), addressController.getById);
  }
}

export default new AddressRouter().router;
