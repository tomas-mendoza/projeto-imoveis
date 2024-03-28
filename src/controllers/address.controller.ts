import { Request, Response } from 'express';
import errorHandler from '../helpers/error.handler';
import Address from '../models/Address';
import addressRepository from '../repositories/address.repository';

class AddressController {
  async create(req: Request, res: Response) {
    try {
      const {
        state,
        city,
        district,
        street,
        complement,
        cep
      } = req.body;
      
      const newAddress = new Address({
        state,
        city,
        district,
        street,
        complement,
        cep
      });

      const data = await addressRepository.create(newAddress);

      return res.status(200).json({
        status: 'Created!',
        message: 'This address has been created successfully!',
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
        state,
        city,
        district,
        street,
        complement,
        cep
      } = req.body;

      const updatedAddress = new Address({
        id: parseInt(req.params.id),
        state,
        city,
        district,
        street,
        complement,
        cep
      });

      const data = await addressRepository.update(updatedAddress);

      return res.status(200).json({
        status: 'Updated!',
        message: 'This address has been updated successfully!',
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
      await addressRepository.delete(parseInt(req.params.id));

      return res.status(200).json({
        status: 'Deleted!',
        message: 'This address has been deleted successfully!'
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
      const allAddress = await addressRepository.getAll();

      return res.status(200).json({
        status: 'Ok!',
        message: 'This all address data has been fetched successfully!',
        data: allAddress
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
      const oneAddress = await addressRepository.getById(parseInt(req.params.id));

      return res.status(200).json({
        status: 'Ok!',
        message: 'This address data has been fetched successfully!',
        data: oneAddress
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

export default new AddressController();
