import EntityNotFound from "../errors/EntityNotFound";
import Broker from "../models/Broker";
import Customer from "../models/Customer";
import History from "../models/History";
import Property from "../models/Property";

interface IHistoryRepo {
  create(history: History): Promise<History>;
  update(history: History): Promise<History>;
  delete(id: number): Promise<void>;
  getAll(): Promise<History[]>;
  getById(id: number): Promise<History>;
}

class HistoryRepo implements IHistoryRepo {
  async create(history: History) {
    const {
      property_id,
      customer_id,
      broker_id,
      negotiation_date,
      commission_perc
    } = history;

    return await History.create({
      property_id,
      customer_id,
      broker_id,
      negotiation_date,
      commission_perc
    });
  }

  async update(history: History) {
    const {
      id,
      property_id,
      customer_id,
      broker_id,
      negotiation_date,
      commission_perc
    } = history;

    const oldHistory = await History.findByPk(id);

    if(!oldHistory) {
      throw new EntityNotFound('History');
    }

    oldHistory.property_id = property_id;
    oldHistory.customer_id = customer_id;
    oldHistory.broker_id = broker_id;
    oldHistory.negotiation_date = negotiation_date;
    oldHistory.commission_perc = commission_perc;

    return await oldHistory.save();
  }

  async delete(id: number) {
    const oldHistory = await History.findByPk(id);

    if(!oldHistory) {
      throw new EntityNotFound('History');
    }

    await oldHistory.destroy();
  }

  async getAll() {
    return await History.findAll({
      include: [
        {
          model: Property
        },
        {
          model: Customer
        },
        {
          model: Broker
        }
      ],
      attributes: {
        exclude: [
          'property_id',
          'customer_id',
          'broker_id'
        ]
      }
    });
  }

  async getById(id: number) {
    const history = await History.findOne({
      where: {
        id
      },
      include: [
        {
          model: Property
        },
        {
          model: Customer
        },
        {
          model: Broker
        }
      ],
      attributes: {
        exclude: [
          'property_id',
          'customer_id',
          'broker_id'
        ]
      }
    });

    if(!history) {
      throw new EntityNotFound('History');
    }

    return history;
  }
}

export default new HistoryRepo();