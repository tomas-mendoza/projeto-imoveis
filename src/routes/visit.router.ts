import visitController from '../controllers/visit.controller';
import validateSchema from '../middlewares/validate.schema';
import { createVisitSchema, deleteVisitSchema, updateVisitSchema } from '../schemas/visit.schema';
import BaseRouter from './base.router';

class VisitRouter extends BaseRouter {
  routes(): void {
    this.router.post('', validateSchema(createVisitSchema), visitController.create);
    this.router.patch('', validateSchema(updateVisitSchema), visitController.update);
    this.router.delete('', validateSchema(deleteVisitSchema), visitController.delete);
    this.router.get('', visitController.getAll);
  }
}

export default new VisitRouter().router;
