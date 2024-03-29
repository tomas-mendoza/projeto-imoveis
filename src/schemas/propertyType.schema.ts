import { z } from 'zod';

export const createPropertyTypeSchema = z.object({
  body: z.object({
    description: z
      .string({ required_error: 'You should insert a description!' })
      .min(3, { message: 'The description should be greater than 3 characters!' })
      .max(50, { message: 'The description should be smaller than 50 characters!' }) 
  })
});

export const updatePropertyTypeSchema = z.object({
  params: z.object({
    id: z
      .coerce
      .number({ required_error: 'You should insert an id!' })
      .min(1, { message: 'The id should be greater than 0!' })
  }),
  body: z.object({
    description: z
      .string({ required_error: 'You should insert a description!' })
      .min(3, { message: 'The description should be greater than 3 characters!' })
      .max(50, { message: 'The description should be smaller than 50 characters!' })
  })
});
