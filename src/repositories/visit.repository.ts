import EntityNotFound from '../errors/EntityNotFound';
import Customer from '../models/Customer';
import Property from '../models/Property';
import Visit from '../models/Visit';

interface IVisitRepo {
  create(visit: Visit): Promise<Visit>;
  update(visit: Visit): Promise<Visit>;
  delete(id: number): Promise<void>;
  getAll(): Promise<Visit[]>;
  getById(id: number): Promise<Visit>;
}

class VisitRepo implements IVisitRepo {
  async create(visit: Visit) {
    const {
      property_id,
      customer_id,
      visit_date,
      visit_realized
    } = visit;

    return await Visit.create({
      property_id,
      customer_id,
      visit_date,
      visit_realized
    });
  }

  async update(visit: Visit) {
    const {
      id,
      property_id,
      customer_id,
      visit_date,
      visit_realized
    } = visit;

    const oldVisit = await Visit.findByPk(id);

    if(!oldVisit) {
      throw new EntityNotFound('Visit');
    }

    oldVisit.property_id = property_id;
    oldVisit.customer_id = customer_id;
    oldVisit.visit_date = visit_date;
    oldVisit.visit_realized = visit_realized;

    return await oldVisit.save();
  }

  async delete(id: number) {
    const oldVisit = await Visit.findByPk(id);

    if(!oldVisit) {
      throw new EntityNotFound('Visit');
    }

    await oldVisit.destroy();
  }

  async getAll() {
    return await Visit.findAll({
      include: [
        {
          model: Property
        },
        {
          model: Customer
        }
      ],
      attributes: {
        exclude: [
          'property_id',
          'customer_id'
        ]
      }
    });
  }

  async getById(id: number) {
    const visit = await Visit.findOne({
      where: {
        id
      },
      include: [
        {
          model: Property
        },
        {
          model: Customer
        }
      ],
      attributes: {
        exclude: [
          'property_id',
          'customer_id'
        ]
      }
    });
    
    if(!visit) {
      throw new EntityNotFound('Visit');
    }

    return visit;
  }
}

export default new VisitRepo();
