import EntityNotFound from '../errors/EntityNotFound';
import Address from '../models/Address';

interface IAddressRepo {
  create(address: Address): Promise<Address>;
  update(Address: Address): Promise<Address>;
  delete(id: number): Promise<void>;
  getAll(): Promise<Address[]>;
  getById(id: number): Promise<Address>;
}

class AddressRepo implements IAddressRepo {
  async create(address: Address) {
    const {
      state,
      city,
      district,
      street,
      complement,
      cep
    } = address;

    return await Address.create({
      state,
      city,
      district,
      street,
      complement,
      cep
    });
  }

  async update(address: Address) {
    const oldAddress = await Address.findByPk(address.id);

    if(!oldAddress) {
      throw new EntityNotFound('Address');
    }

    const {
      state,
      city,
      district,
      street,
      complement,
      cep
    } = address;

    oldAddress.state = state;
    oldAddress.city = city;
    oldAddress.district = district;
    oldAddress.street = street;
    oldAddress.complement = complement;
    oldAddress.cep = cep;

    return await oldAddress.save();
  }

  async delete(id: number) {
    const oldAddress = await Address.findByPk(id);

    if(!oldAddress) {
      throw new EntityNotFound('Address');
    }

    await oldAddress.destroy();
  }

  async getAll() {
    const allAddress = await Address.findAll();

    return allAddress;
  }

  async getById(id: number) {
    const address = await Address.findByPk(id);

    if(!address) {
      throw new EntityNotFound('Address');
    }

    return address;
  } 
}

export default new AddressRepo();
