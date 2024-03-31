import { z } from 'zod';

export const createPhotoSchema = z.object({
  body: z.object({
    aws_key: z
      .string({ required_error: 'You should insert an aws key!' })
      .length(36, { message: 'The aws key should be valid!' }),
    property_id: z
      .number({ required_error: 'You should insert a property id!' })
      .min(1, { message: 'The property id should be greater than 0!' })
  })
});

export const updatePhotoSchema = z.object({
  params: z.object({
    id: z
      .coerce
      .number({ required_error: 'You should insert an id!' })
      .min(1, { message: 'The id should be greater than 0!' })
  }),
  body: z.object({
    aws_key: z
      .string({ required_error: 'You should insert an aws key!' })
      .length(36, { message: 'The aws key should be valid!' }),
    property_id: z
      .number({ required_error: 'You should insert a property id!' })
      .min(1, { message: 'The property id should be greater than 0!' })
  })
});
