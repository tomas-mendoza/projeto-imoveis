import EntityNotFound from '../errors/EntityNotFound';
import Photo from '../models/Photo';

interface IPhotoRepo {
  create(photo: Photo): Promise<Photo>;
  update(photo: Photo): Promise<Photo>;
  delete(id: number): Promise<void>;
  getAll(): Promise<Photo[]>;
  getById(id: number): Promise<Photo>;
}

class PhotoRepo implements IPhotoRepo {
  async create(photo: Photo) {
    const {
      aws_key,
      property_id
    } = photo;

    return await Photo.create({
      aws_key,
      property_id
    });
  }

  async update(photo: Photo) {
    const {
      id,
      aws_key,
      property_id
    } = photo;

    const oldPhoto = await Photo.findByPk(id);

    if(!oldPhoto) {
      throw new EntityNotFound('Photo');
    }

    oldPhoto.aws_key = aws_key;
    oldPhoto.property_id = property_id;

    return await oldPhoto.save();
  }

  async delete(id: number) {
    const oldPhoto = await Photo.findByPk(id);

    if(!oldPhoto) {
      throw new EntityNotFound('Photo');
    }

    await oldPhoto.destroy();
  }

  async getAll() {
    return await Photo.findAll();
  }

  async getById(id: number) {
    const photo = await Photo.findByPk(id);

    if(!photo) {
      throw new EntityNotFound('Photo');
    }

    return photo;
  }
}

export default new PhotoRepo();
