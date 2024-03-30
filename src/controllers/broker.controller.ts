import { Request, Response } from 'express';
import errorHandler from '../helpers/error.handler';
import Broker from '../models/Broker';
import brokerRepository from '../repositories/broker.repository';

class BrokerController {
  async create(req: Request, res: Response) {
    try {
      const {
        name,
        cpf,
        cnpj,
        birthdate,
        address_id
      } = req.body;

      const [month, date, year] = birthdate.split('/');


      const formattedBirthdate = new Date(year, parseInt(month) - 1, date);

      const newBroker = new Broker({
        name,
        cpf,
        cnpj,
        birthdate: formattedBirthdate,
        address_id
      });

      const data = await brokerRepository.create(newBroker);

      return res.status(200).json({
        status: 'Created!',
        message: 'This broker has been created successfully!',
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
        name,
        cpf,
        cnpj,
        birthdate,
        address_id
      } = req.body;

      const [month, date, year] = birthdate.split('/');

      const formattedBirthdate = new Date(year, parseInt(month) - 1, date);

      const updatedBroker = new Broker({
        id: parseInt(req.params.id),
        name,
        cpf,
        cnpj,
        birthdate: formattedBirthdate,
        address_id
      });

      const data = await brokerRepository.update(updatedBroker);

      return res.status(200).json({
        status: 'Updated!',
        message: 'This broker has been updated successfully!',
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
      await brokerRepository.delete(parseInt(req.params.id));

      return res.status(200).json({
        status: 'Deleted!',
        message: 'This broker has been deleted successfully!'
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
      const data = await brokerRepository.getAll();

      return res.status(200).json({
        status: 'Ok!',
        message: 'This all brokers data has been fetched successfully!',
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
      const data = await brokerRepository.getById(parseInt(req.params.id));

      return res.status(200).json({
        status: 'Ok!',
        message: 'This broker data has been fetched successfully!',
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

export default new BrokerController();
