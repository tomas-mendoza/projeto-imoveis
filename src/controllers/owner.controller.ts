import { Request, Response } from 'express';
import errorHandler from '../helpers/error.handler';
import Owner from '../models/Owner';
import ownerRepository from '../repositories/owner.repository';

class OwnerController {
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

      const newOwner = new Owner({
        name,
        cpf,
        cnpj,
        birthdate: formattedBirthdate,
        address_id
      });

      const data = await ownerRepository.create(newOwner);

      return res.status(200).json({
        status: 'Created!',
        message: 'This owner has been created successfully!',
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

      const updatedOwner = new Owner({
        id: parseInt(req.params.id),
        name,
        cpf,
        cnpj,
        birthdate: formattedBirthdate,
        address_id
      });

      const data = await ownerRepository.update(updatedOwner);

      return res.status(200).json({
        status: 'Updated!',
        message: 'This owner has been updated successfully!',
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
      await ownerRepository.delete(parseInt(req.params.id));

      return res.status(200).json({
        status: 'Deleted!',
        message: 'This owner has been deleted successfully!'
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
      const data = await ownerRepository.getAll();

      return res.status(200).json({
        status: 'Ok!',
        message: 'This all owners data has been fetched successfully!',
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
      const data = await ownerRepository.getById(parseInt(req.params.id));

      return res.status(200).json({
        status: 'Ok!',
        message: 'This owner data has been fetched successfully!',
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

export default new OwnerController();
