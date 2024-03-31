import { Request, Response } from 'express';
import errorHandler from '../helpers/error.handler';
import Photo from '../models/Photo';
import photoRepository from '../repositories/photo.repository';

class PhotoController {
  async create(req: Request, res: Response) {
    try {
      const {
        aws_key,
        property_id
      } = req.body;

      const newPhoto = new Photo({
        aws_key,
        property_id
      });

      const data = await photoRepository.create(newPhoto);

      return res.status(200).json({
        status: 'Created!',
        message: 'This photo has been saved successfully!',
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
        aws_key,
        property_id
      } = req.body;

      const updatedPhoto = new Photo({
        id: parseInt(req.params.id),
        aws_key,
        property_id
      });

      const data = await photoRepository.update(updatedPhoto);

      return res.status(200).json({
        status: 'Updated!',
        message: 'This photo has been updated successfully!',
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
      await photoRepository.delete(parseInt(req.params.id));

      return res.status(200).json({
        status: 'Deleted!',
        message: 'This photo has been deleted successfully!'
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
      const data = await photoRepository.getAll();

      return res.status(200).json({
        status: 'Ok!',
        message: 'This all photo data has been fetched successfully!',
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
      const data = await photoRepository.getById(parseInt(req.params.id));

      return res.status(200).json({
        status: 'Ok!',
        message: 'This photo data has been fetched successfully!',
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

export default new PhotoController();
