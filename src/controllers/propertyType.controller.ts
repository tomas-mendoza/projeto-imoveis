import { Request, Response } from 'express';
import errorHandler from '../helpers/error.handler';
import PropertyType from '../models/PropertyType';
import propertyTypeRepository from '../repositories/propertyType.repository';

class PropertyTypeController {
  async create(req: Request, res: Response) {
    try {
      const { description } = req.body;

      const newPropertyType = new PropertyType({
        description
      });

      const data = await propertyTypeRepository.create(newPropertyType);

      res.status(200).json({
        status: 'Created!',
        message: 'This property type has been created successfully!',
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
      const { description } = req.body;

      const updatedPropertyType = new PropertyType({
        id: parseInt(req.params.id),
        description
      });

      const data = await propertyTypeRepository.update(updatedPropertyType);

      res.status(200).json({
        status: 'Updated!',
        message: 'This property type has been updated successfully!',
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
      await propertyTypeRepository.delete(parseInt(req.params.id));

      res.status(200).json({
        status: 'Deleted!',
        message: 'This property type has been deleted successfully!'
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
      const data = await propertyTypeRepository.getAll();

      res.status(200).json({
        status: 'Ok!',
        message: 'This all property type data has been fetched successfully!',
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
      const data = await propertyTypeRepository.getById(parseInt(req.params.id));

      res.status(200).json({
        status: 'Ok!',
        message: 'This property type data has been fetched!',
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

export default new PropertyTypeController();
