import EntityNotFound from '../errors/EntityNotFound';
import Address from '../models/Address';
import Owner from '../models/Owner';

interface IOwnerRepo {
  create(owner: Owner): Promise<Owner>;
  update(owner: Owner): Promise<Owner>;
  delete(id: number): Promise<void>;
  getAll(): Promise<Owner[]>;
  getById(id: number): Promise<Owner>;
}

class OwnerRepo implements IOwnerRepo {
  async create(owner: Owner) {
    const {
      name,
      cpf,
      cnpj,
      birthdate,
      address_id
    } = owner;

    const checkAddress = await Address.findByPk(address_id);

    if(!checkAddress) {
      throw new EntityNotFound('Address');
    }

    return await Owner.create({
      name,
      cpf,
      cnpj,
      birthdate,
      address_id
    });
  }

  async update(owner: Owner) {
    const {
      id,
      name,
      cpf,
      cnpj,
      birthdate,
      address_id
    } = owner;

    const checkAddress = await Address.findByPk(address_id);

    if(!checkAddress) {
      throw new EntityNotFound('Address');
    }

    const oldOwner = await Owner.findByPk(id);

    if(!oldOwner) {
      throw new EntityNotFound('Owner');
    }

    oldOwner.name = name;
    oldOwner.cpf = cpf;
    oldOwner.cnpj = cnpj;
    oldOwner.birthdate = birthdate;
    oldOwner.address_id = address_id;

    return await oldOwner.save();
  }

  async delete(id: number) {
    const oldOwner = await Owner.findByPk(id);

    if(!oldOwner) {
      throw new EntityNotFound('Owner');
    }

    await oldOwner.destroy();
  }

  async getAll() {
    return await Owner.findAll({
      include: {
        model: Address,
        as: 'address'
      },
      attributes: {
        exclude: [
          'address_id'
        ]
      }
    });
  }

  async getById(id: number) {
    const owner = await Owner.findByPk(id);

    if(!owner) {
      throw new EntityNotFound('Owner');
    }

    return owner;
  }
}

export default new OwnerRepo();
