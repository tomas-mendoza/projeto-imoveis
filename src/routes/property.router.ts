import propertyController from '../controllers/property.controller';
import validateSchema from '../middlewares/validate.schema';
import { getOrDeleteSchema } from '../schemas/generic.schema';
import { createPropertySchema, updatePropertySchema } from '../schemas/property.schema';
import BaseRouter from './base.router';

class PropertyRouter extends BaseRouter {
  routes(): void {
    this.router.post('', validateSchema(createPropertySchema), propertyController.create);
    this.router.patch('/:id', validateSchema(updatePropertySchema), propertyController.update);
    this.router.delete('/:id', validateSchema(getOrDeleteSchema), propertyController.delete);
    this.router.get('', propertyController.getAll);
    this.router.get('/:id', validateSchema(getOrDeleteSchema), propertyController.getById);
  }
}

export default new PropertyRouter().router;
