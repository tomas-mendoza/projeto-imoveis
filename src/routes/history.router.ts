import historyController from '../controllers/history.controller';
import validateSchema from '../middlewares/validate.schema';
import { getOrDeleteSchema } from '../schemas/generic.schema';
import { createHistorySchema, updateHistorySchema } from '../schemas/history.schema';
import BaseRouter from './base.router';

class HistoryRouter extends BaseRouter {
  routes(): void {
    this.router.post('', validateSchema(createHistorySchema), historyController.create);
    this.router.patch('/:id', validateSchema(updateHistorySchema), historyController.update);
    this.router.delete('/:id', validateSchema(getOrDeleteSchema), historyController.delete);
    this.router.get('', historyController.getAll);
    this.router.get('/:id', validateSchema(getOrDeleteSchema), historyController.getById);
  }
}

export default new HistoryRouter().router;