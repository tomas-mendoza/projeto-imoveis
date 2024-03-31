import { z } from 'zod';

export const createPropertySchema = z.object({
  body: z.object({
    description: z
      .string({ required_error: 'You should insert a description!' })
      .max(400, { message: 'The description should be smaller than 400 characters!' }),
    area: z
      .number({ required_error: 'You should insert an area!' })
      .min(0, { message: 'The area should be greater than 0!' }),
    type_id: z
      .number({ required_error: 'You should insert a type!' })
      .min(1, { message: 'The type should be valid!' }),
    address_id: z
      .number({ required_error: 'You should insert an address!' })
      .min(1, { message: 'The address should be greater than 0!' })
  })
});

export const updatePropertySchema = z.object({
  params: z.object({
    id: z
      .coerce
      .number({ required_error: 'You should insert an id!' })
      .min(1, { message: 'The id should be greater than 0!' })
  }),
  body: z.object({
    description: z
      .string({ required_error: 'You should insert a description!' })
      .max(400, { message: 'The description should be smaller than 400 characters!' }),
    area: z
      .number({ required_error: 'You should insert an area!' })
      .min(0, { message: 'The area should be greater than 0!' }),
    type_id: z
      .number({ required_error: 'You should insert a type!' })
      .min(1, { message: 'The type should be valid!' }),
    address_id: z
      .number({ required_error: 'You should insert an address!' })
      .min(1, { message: 'The address should be greater than 0!' })
  })
});
