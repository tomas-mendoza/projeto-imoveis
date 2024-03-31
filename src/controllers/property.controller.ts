import { Request, Response } from 'express';
import errorHandler from '../helpers/error.handler';
import propertyRepository from '../repositories/property.repository';
import Property from '../models/Property';

class PropertyController {
  async create(req: Request, res: Response) {
    try {
      const {
        description,
        area,
        type_id,
        address_id
      } = req.body;

      const newProperty = new Property({
        description,
        area,
        type_id,
        address_id
      });

      const data = await propertyRepository.create(newProperty);

      res.status(200).json({
        status: 'Created!',
        messsage: 'This property has been created successfully!',
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
        description,
        area,
        type_id,
        address_id
      } = req.body;

      const updatedProperty = new Property({
        id: parseInt(req.params.id),
        description,
        area,
        type_id,
        address_id
      });

      const data = await propertyRepository.update(updatedProperty);

      res.status(200).json({
        status: 'Updated!',
        message: 'This property has been updated successfully!',
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
      await propertyRepository.delete(parseInt(req.params.id));

      res.status(200).json({
        status: 'Deleted!',
        message: 'This property has been deleted successfully!'
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
      const data = await propertyRepository.getAll();

      res.status(200).json({
        status: 'Ok!',
        message: 'This all property data has been fetched successfully!',
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
      const data = await propertyRepository.getById(parseInt(req.params.id));

      res.status(200).json({
        status: 'Ok!',
        message: 'This property data has been fetched successfully!',
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

export default new PropertyController();
