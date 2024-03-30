import ownerController from '../controllers/owner.controller';
import validateSchema from '../middlewares/validate.schema';
import { getOrDeleteSchema } from '../schemas/generic.schema';
import { createPersonSchema, updatePersonSchema } from '../schemas/person.schema';
import BaseRouter from './base.router';

class OwnerRouter extends BaseRouter {
  routes(): void {
    this.router.post('', validateSchema(createPersonSchema), ownerController.create);
    this.router.patch('/:id', validateSchema(updatePersonSchema), ownerController.update);
    this.router.delete('/:id', validateSchema(getOrDeleteSchema), ownerController.delete);
    this.router.get('', ownerController.getAll);
    this.router.get('/:id', validateSchema(getOrDeleteSchema), ownerController.getById);
  }
}

export default new OwnerRouter().router;
