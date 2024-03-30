import EntityNotFound from '../errors/EntityNotFound';
import Address from '../models/Address';
import Customer from '../models/Customer';

interface ICustomerRepo {
  create(customer: Customer): Promise<Customer>;
  update(customer: Customer): Promise<Customer>;
  delete(id: number): Promise<void>;
  getAll(): Promise<Customer[]>;
  getById(id: number): Promise<Customer>;
}

class CustomerRepo implements ICustomerRepo {
  async create(customer: Customer) {
    const {
      name,
      cpf,
      cnpj,
      birthdate,
      address_id
    } = customer;

    const checkAddress = await Address.findByPk(address_id);

    if(!checkAddress) {
      throw new EntityNotFound('Address');
    }

    return await Customer.create({
      name,
      cpf,
      cnpj,
      birthdate,
      address_id
    });
  }

  async update(customer: Customer) {
    const {
      id,
      name,
      cpf,
      cnpj,
      birthdate,
      address_id
    } = customer;

    const checkAddress = await Address.findByPk(address_id);

    if(!checkAddress) {
      throw new EntityNotFound('Address');
    }

    const oldCustomer = await Customer.findByPk(id);

    if(!oldCustomer) {
      throw new EntityNotFound('Customer');
    }

    oldCustomer.name = name;
    oldCustomer.cpf = cpf;
    oldCustomer.cnpj = cnpj;
    oldCustomer.birthdate = birthdate;
    oldCustomer.address_id = address_id;

    return await oldCustomer.save();
  }

  async delete(id: number) {
    const oldCustomer = await Customer.findByPk(id);

    if(!oldCustomer) {
      throw new EntityNotFound('Customer');
    }

    await oldCustomer.destroy();
  }

  async getAll() {
    return await Customer.findAll({
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
    const customer = await Customer.findByPk(id);

    if(!customer) {
      throw new EntityNotFound('Customer');
    }

    return customer;
  }
}

export default new CustomerRepo();
