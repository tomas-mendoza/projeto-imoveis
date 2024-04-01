import visitController from '../controllers/visit.controller';
import validateSchema from '../middlewares/validate.schema';
import { getOrDeleteSchema } from '../schemas/generic.schema';
import { createVisitSchema, updateVisitSchema } from '../schemas/visit.schema';
import BaseRouter from './base.router';

class VisitRouter extends BaseRouter {
  routes(): void {
    this.router.post('', validateSchema(createVisitSchema), visitController.create);
    this.router.patch('/:id', validateSchema(updateVisitSchema), visitController.update);
    this.router.delete('/:id', validateSchema(getOrDeleteSchema), visitController.delete);
    this.router.get('', visitController.getAll);
    this.router.get('/:id', validateSchema(getOrDeleteSchema), visitController.getById);
  }
}

export default new VisitRouter().router;
