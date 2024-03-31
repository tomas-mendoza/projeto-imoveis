import photoController from '../controllers/photo.controller';
import validateSchema from '../middlewares/validate.schema';
import { getOrDeleteSchema } from '../schemas/generic.schema';
import { createPhotoSchema, updatePhotoSchema } from '../schemas/photo.schema';
import BaseRouter from './base.router';

class PhotoRouter extends BaseRouter {
  routes(): void {
    this.router.post('', validateSchema(createPhotoSchema), photoController.create);
    this.router.patch('/:id', validateSchema(updatePhotoSchema), photoController.update);
    this.router.delete('/:id', validateSchema(getOrDeleteSchema), photoController.delete);
    this.router.get('', photoController.getAll);
    this.router.get('/:id', validateSchema(getOrDeleteSchema), photoController.getById);
  }
}

export default new PhotoRouter().router;
