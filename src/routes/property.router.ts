import propertyController from '../controllers/property.controller';
import visitController from '../controllers/visit.controller';
import validateSchema from '../middlewares/validate.schema';
import { getOrDeleteSchema } from '../schemas/generic.schema';
import { createPropertySchema, updatePropertySchema } from '../schemas/property.schema';
import { getByCostumerIdAndPropertyIdSchema } from '../schemas/visit.schema';
import BaseRouter from './base.router';

class PropertyRouter extends BaseRouter {
  routes(): void {
    this.router.post('', validateSchema(createPropertySchema), propertyController.create);
    this.router.patch('/:id', validateSchema(updatePropertySchema), propertyController.update);
    this.router.delete('/:id', validateSchema(getOrDeleteSchema), propertyController.delete);
    this.router.get('', propertyController.getAll);
    this.router.get('/:id', validateSchema(getOrDeleteSchema), propertyController.getById);
    this.router.get('/:id/visits', validateSchema(getOrDeleteSchema), visitController.getByPropertyId);
    this.router.get('/:property_id/visits/:customer_id', validateSchema(getByCostumerIdAndPropertyIdSchema), visitController.getByCustomerIdAndPropertyId);
  }
}

export default new PropertyRouter().router;
