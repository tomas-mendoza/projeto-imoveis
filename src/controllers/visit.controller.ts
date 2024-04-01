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
        id: parseInt(req.params.id),
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
      await visitRepository.delete(parseInt(req.params.id));

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

  async getById(req: Request, res: Response) {
    try {
      const data = await visitRepository.getById(parseInt(req.params.id));

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
