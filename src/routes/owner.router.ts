import ownerController from '../controllers/owner.controller';
import validateSchema from '../middlewares/validate.schema';
import { getOrDeleteSchema } from '../schemas/generic.schema';
import { createOwnerSchema, updateOwnerSchema } from '../schemas/owner.schema';
import BaseRouter from './base.router';

class OwnerRouter extends BaseRouter {
  routes(): void {
    this.router.post('', validateSchema(createOwnerSchema), ownerController.create);
    this.router.patch('/:id', validateSchema(updateOwnerSchema), ownerController.update);
    this.router.delete('/:id', validateSchema(getOrDeleteSchema), ownerController.delete);
    this.router.get('', ownerController.getAll);
    this.router.get('/:id', validateSchema(getOrDeleteSchema), ownerController.getById);
  }
}

export default new OwnerRouter().router;
