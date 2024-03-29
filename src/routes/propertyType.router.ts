import propertyTypeController from '../controllers/propertyType.controller';
import validateSchema from '../middlewares/validate.schema';
import { getOrDeleteSchema } from '../schemas/generic.schema';
import { createPropertyTypeSchema, updatePropertyTypeSchema } from '../schemas/propertyType.schema';
import BaseRouter from './base.router';

class PropertyTypeRouter extends BaseRouter {
  routes(): void {
    this.router.post('', validateSchema(createPropertyTypeSchema), propertyTypeController.create);
    this.router.patch('/:id', validateSchema(updatePropertyTypeSchema), propertyTypeController.update);
    this.router.delete('/:id', validateSchema(getOrDeleteSchema), propertyTypeController.delete);
    this.router.get('', propertyTypeController.getAll);
    this.router.get('/:id', validateSchema(getOrDeleteSchema), propertyTypeController.getById);
  }
}

export default new PropertyTypeRouter().router;
