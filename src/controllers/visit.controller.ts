import { Request, Response } from 'express';
import errorHandler from '../helpers/error.handler';
import Visit from '../models/Visit';
import visitRepository from '../repositories/visit.repository';

class VisitController {
  async create(req: Request, res: Response) {
    try {
      const {
        property_id,
        customer_id,
        visit_date,
        visit_realized
      } = req.body;

      const [month, date, year] = visit_date.split('/');

      const formattedDate = new Date(year, parseInt(month) - 1, date);

      const newVisit = new Visit({
        property_id,
        customer_id,
        visit_date: formattedDate,
        visit_realized
      });

      const data = await visitRepository.create(newVisit);

      return res.status(200).json({
        status: 'Created!',
        message: 'This visit has been created successfully!',
        data
      });
    } catch(err: unknown) {
      const {
        code,
        status,
        message,
        errors,
        cause
      } = errorHandler(err);

      return res.status(code).json({
        status,
        message,
        errors,
        cause
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const {
        property_id,
        customer_id,
        visit_date,
        visit_realized
      } = req.body;

      const [month, date, year] = visit_date.split('/');

      const formattedDate = new Date(year, parseInt(month) - 1, date);

      const updatedVisit = new Visit({
        property_id,
        customer_id,
        visit_date: formattedDate,
        visit_realized
      });

      const data = await visitRepository.update(updatedVisit);

      return res.status(200).json({
        status: 'Updated!',
        message: 'This visit has been updated successfully!',
        data
      });
    } catch(err: unknown) {
      const {
        code,
        status,
        message,
        errors,
        cause
      } = errorHandler(err);

      return res.status(code).json({
        status,
        message,
        errors,
        cause
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const {
        customer_id,
        property_id
      } = req.query;

      if(!customer_id) {
        return;
      }
      await visitRepository.delete(parseInt(customer_id as string), parseInt(property_id as string));

      return res.status(200).json({
        status: 'Deleted!',
        message: 'This visit has been deleted successfully!'
      });
    } catch(err: unknown) {
      const {
        code,
        status,
        message,
        errors,
        cause
      } = errorHandler(err);

      return res.status(code).json({
        status,
        message,
        errors,
        cause
      });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const data = await visitRepository.getAll();

      return res.status(200).json({
        status: 'Ok!',
        message: 'This all visit data has been fetched successfully!',
        data
      });
    } catch(err: unknown) {
      const {
        code,
        status,
        message,
        errors,
        cause
      } = errorHandler(err);

      return res.status(code).json({
        status,
        message,
        errors,
        cause
      });
    }
  }

  async getByCustomerId(req: Request, res: Response) {
    try {
      const data = await visitRepository.getByCustomerId(parseInt(req.params.id));

      return res.status(200).json({
        status: 'Ok!',
        message: 'This visit data has been fetched successfully!',
        data
      });
    } catch(err: unknown) {
      const {
        code,
        status,
        message,
        errors,
        cause
      } = errorHandler(err);

      return res.status(code).json({
        status,
        message,
        errors,
        cause
      });
    }
  }

  async getByPropertyId(req: Request, res: Response) {
    try {
      const data = await visitRepository.getByPropertyId(parseInt(req.params.id));

      return res.status(200).json({
        status: 'Ok!',
        message: 'This visit data has been fetched successfully!',
        data
      });
    } catch(err: unknown) {
      const {
        code,
        status,
        message,
        errors,
        cause
      } = errorHandler(err);

      return res.status(code).json({
        status,
        message,
        errors,
        cause
      });
    }
  }

  async getByCustomerIdAndPropertyId(req: Request, res: Response) {
    try {
      const data = await visitRepository.getByCustomerIdAndPropertyId(
        parseInt(req.params.customer_id),
        parseInt(req.params.property_id)
      );

      return res.status(200).json({
        status: 'Ok!',
        message: 'This visit data has been fetched successfully!',
        data
      });
    } catch(err: unknown) {
      const {
        code,
        status,
        message,
        errors,
        cause
      } = errorHandler(err);

      return res.status(code).json({
        status,
        message,
        errors,
        cause
      });
    }
  }
}

export default new VisitController();
