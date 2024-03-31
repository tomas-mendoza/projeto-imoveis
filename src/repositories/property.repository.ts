import EntityNotFound from '../errors/EntityNotFound';
import Address from '../models/Address';
import Photo from '../models/Photo';
import Property from '../models/Property';
import PropertyType from '../models/PropertyType';

interface IPropertyRepo {
  create(property: Property): Promise<Property>;
  update(property: Property): Promise<Property>;
  delete(id: number): Promise<void>;
  getAll(): Promise<Property[]>;
  getById(id: number): Promise<Property>;
}

class PropertyRepo implements IPropertyRepo {
  async create(property: Property) {
    const {
      description,
      area,
      type_id,
      address_id
    } = property;

    const checkAddress = await Address.findByPk(address_id);

    if(!checkAddress) {
      throw new EntityNotFound('Address');
    }

    const checkType = await PropertyType.findByPk(type_id);

    if(!checkType) {
      throw new EntityNotFound('PropertyType');
    }

    return await Property.create({
      description,
      area,
      type_id,
      address_id
    });
  }

  async update(property: Property) {
    const {
      id,
      description,
      area,
      type_id,
      address_id
    } = property;

    const checkAddress = await Address.findByPk(address_id);

    if(!checkAddress) {
      throw new EntityNotFound('Address');
    }

    const checkType = await PropertyType.findByPk(type_id);

    if(!checkType) {
      throw new EntityNotFound('PropertyType');
    }

    const oldProperty = await Property.findByPk(id);

    if(!oldProperty) {
      throw new EntityNotFound('Property');
    }

    oldProperty.description = description;
    oldProperty.area = area;
    oldProperty.type_id = type_id;
    oldProperty.address_id = address_id;

    return await oldProperty.save();
  }

  async delete(id: number) {
    const oldProperty = await Property.findByPk(id);

    if(!oldProperty) {
      throw new EntityNotFound('Property');
    }

    await oldProperty.destroy();
  }

  async getAll() {
    return await Property.findAll({
      include: [
        {
          model: PropertyType,
        },
        {
          model: Address,
        },
        {
          model: Photo
        }
      ],
      attributes: {
        exclude: [
          'address_id',
          'type_id'
        ]
      }
    });
  }

  async getById(id: number) {
    const property = await Property.findOne({
      where: {
        id
      },
      include: [
        {
          model: PropertyType,
        },
        {
          model: Address,
        },
        {
          model: Photo
        }
      ],
      attributes: {
        exclude: [
          'address_id',
          'type_id'
        ]
      }
    }); 

    if(!property) {
      throw new EntityNotFound('Property');
    }

    return property;
  }
}

export default new PropertyRepo();
