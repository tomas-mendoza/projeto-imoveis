import EntityNotFound from '../errors/EntityNotFound';
import Address from '../models/Address';
import Broker from '../models/Broker';

interface IBrokerRepo {
  create(broker: Broker): Promise<Broker>;
  update(broker: Broker): Promise<Broker>;
  delete(id: number): Promise<void>;
  getAll(): Promise<Broker[]>;
  getById(id: number): Promise<Broker>;
}

class BrokerRepo implements IBrokerRepo {
  async create(broker: Broker) {
    const {
      name,
      cpf,
      cnpj,
      birthdate,
      address_id
    } = broker;

    const checkAddress = await Address.findByPk(address_id);

    if(!checkAddress) {
      throw new EntityNotFound('Address');
    }

    return await Broker.create({
      name,
      cpf,
      cnpj,
      birthdate,
      address_id
    });
  }

  async update(broker: Broker) {
    const {
      id,
      name,
      cpf,
      cnpj,
      birthdate,
      address_id
    } = broker;

    const checkAddress = await Address.findByPk(address_id);

    if(!checkAddress) {
      throw new EntityNotFound('Address');
    }

    const oldBroker = await Broker.findByPk(id);

    if(!oldBroker) {
      throw new EntityNotFound('Broker');
    }

    oldBroker.name = name;
    oldBroker.cpf = cpf;
    oldBroker.cnpj = cnpj;
    oldBroker.birthdate = birthdate;
    oldBroker.address_id = address_id;

    return await oldBroker.save();
  }

  async delete(id: number) {
    const oldBroker = await Broker.findByPk(id);

    if(!oldBroker) {
      throw new EntityNotFound('Broker');
    }

    await oldBroker.destroy();
  }

  async getAll() {
    return await Broker.findAll({
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
    const broker = await Broker.findByPk(id);

    if(!broker) {
      throw new EntityNotFound('Broker');
    }

    return broker;
  }
}

export default new BrokerRepo();
