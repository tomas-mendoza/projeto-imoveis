import EntityNotFound from '../errors/EntityNotFound';
import PropertyType from '../models/PropertyType';

interface IPropertyTypeRepo {
  create(propertyType: PropertyType): Promise<PropertyType>;
  update(propertyType: PropertyType): Promise<PropertyType>;
  delete(id: number): Promise<void>;
  getAll(): Promise<PropertyType[]>;
  getById(id: number): Promise<PropertyType>;
}

class PropertyTypeRepo implements IPropertyTypeRepo {
  async create(propertyType: PropertyType) {
    const { description } = propertyType;

    return await PropertyType.create({
      description
    });
  }

  async update(propertyType: PropertyType) {
    const { id, description } = propertyType;

    const oldPropertyType = await PropertyType.findByPk(id);

    if(!oldPropertyType) {
      throw new EntityNotFound('PropertyType');
    }

    oldPropertyType.description = description;

    return await oldPropertyType.save();  
  }

  async delete(id: number) {
    const oldPropertyType = await PropertyType.findByPk(id);

    if(!oldPropertyType) {
      throw new EntityNotFound('PropertyType');
    }

    await oldPropertyType.destroy();
  }

  async getAll() {
    return await PropertyType.findAll();
  }

  async getById(id: number) {
    const propertyType = await PropertyType.findByPk(id);

    if(!propertyType) {
      throw new EntityNotFound('PropertyType');
    }

    return propertyType;
  }
}

export default new PropertyTypeRepo();
