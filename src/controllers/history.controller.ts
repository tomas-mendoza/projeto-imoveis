import { Request, Response } from 'express';
import errorHandler from '../helpers/error.handler';
import historyRepository from '../repositories/history.repository';
import History from '../models/History';

class HistoryController {
  async create(req: Request, res: Response) {
    try {
      const {
        property_id,
        customer_id,
        broker_id,
        negotiation_date,
        commission_perc
      } = req.body;

      const [month, date, year] = negotiation_date.split('/');

      const formattedDate = new Date(year, parseInt(month) - 1, date);

      const newHistory = new History({
        property_id,
        customer_id,
        broker_id,
        negotiation_date: formattedDate,
        commission_perc
      });

      const data = await historyRepository.create(newHistory);

      return res.status(200).json({
        status: 'Created!',
        message: 'This history has been created successfully!',
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
        broker_id,
        negotiation_date,
        commission_perc
      } = req.body;

      const [month, date, year] = negotiation_date.split('/');

      const formattedDate = new Date(year, parseInt(month) - 1, date);

      const newHistory = new History({
        id: parseInt(req.params.id),
        property_id,
        customer_id,
        broker_id,
        negotiation_date: formattedDate,
        commission_perc
      });

      const data = await historyRepository.update(newHistory);

      return res.status(200).json({
        status: 'Updated!',
        message: 'This history has been updated successfully!',
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
      await historyRepository.delete(parseInt(req.params.id));

      return res.status(200).json({
        status: 'Deleted!',
        message: 'This history has been deleted successfully!'
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
      const data = await historyRepository.getAll();

      return res.status(200).json({
        status: 'Ok!',
        message: 'This all history data has been fetched successfully!',
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
      const data = await historyRepository.getById(parseInt(req.params.id));

      return res.status(200).json({
        status: 'Ok!',
        message: 'This history data has been fetched successfully!',
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

export default new HistoryController();