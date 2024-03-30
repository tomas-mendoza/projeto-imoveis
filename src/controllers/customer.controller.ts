import { Request, Response } from 'express';
import errorHandler from '../helpers/error.handler';
import Customer from '../models/Customer';
import customerRepository from '../repositories/customer.repository';

class CustomerController {
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

      console.log(formattedBirthdate);

      const newCustomer = new Customer({
        name,
        cpf,
        cnpj,
        birthdate: formattedBirthdate,
        address_id
      });

      const data = await customerRepository.create(newCustomer);

      return res.status(200).json({
        status: 'Created!',
        message: 'This customer has been created successfully!',
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

      const updatedCustomer = new Customer({
        id: parseInt(req.params.id),
        name,
        cpf,
        cnpj,
        birthdate: formattedBirthdate,
        address_id
      });

      const data = await customerRepository.update(updatedCustomer);

      return res.status(200).json({
        status: 'Updated!',
        message: 'This customer has been updated successfully!',
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
      await customerRepository.delete(parseInt(req.params.id));

      return res.status(200).json({
        status: 'Deleted!',
        message: 'This customer has been deleted successfully!'
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
      const data = await customerRepository.getAll();

      return res.status(200).json({
        status: 'Ok!',
        message: 'This all customers data has been fetched successfully!',
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
      const data = await customerRepository.getById(parseInt(req.params.id));

      return res.status(200).json({
        status: 'Ok!',
        message: 'This customer data has been fetched successfully!',
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

export default new CustomerController();
