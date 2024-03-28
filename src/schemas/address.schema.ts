import { z } from 'zod';

export const createAddressSchema = z.object({
  body: z.object({
    state: z
      .string({ required_error: 'You should insert a state!' })
      .length(2, { message: 'The state should have 2 characters!' }),
    city: z
      .string({ required_error: 'You should insert a city!' })
      .max(65, { message: 'The city should be smaller than 65 characters!' }),
    district: z
      .string({ required_error: 'You should insert a district!' })
      .max(70, { message: 'The district should be smaller than 70 characters!' }),
    street: z
      .string({ required_error: 'You should insert a street!' })
      .max(70, { message: 'The street should be smaller than 70 characters!' }),
    complement: z
      .string({ required_error: 'You should insert a complement!' })
      .max(50, { message: 'The complement should be smaller than 50 characters!' }),
    cep: z
      .string({ required_error: 'You should insert a CEP!' })
      .length(8, { message: 'The CEP should be valid!' })
  })
});

export const updateAddressSchema = z.object({
  params: z.object({
    id: z
      .coerce
      .number({ required_error: 'You should insert an id!' })
      .min(1, { message: 'The id should be greater than 0!' })
  }),
  body: z.object({
    state: z
      .string({ required_error: 'You should insert a state!' })
      .length(2, { message: 'The state should have 2 characters!' }),
    city: z
      .string({ required_error: 'You should insert a city!' })
      .max(65, { message: 'The city should be smaller than 65 characters!' }),
    district: z
      .string({ required_error: 'You should insert a district!' })
      .max(70, { message: 'The district should be smaller than 70 characters!' }),
    street: z
      .string({ required_error: 'You should insert a street!' })
      .max(70, { message: 'The street should be smaller than 70 characters!' }),
    complement: z
      .string({ required_error: 'You should insert a complement!' })
      .max(50, { message: 'The complement should be smaller than 50 characters!' }),
    cep: z
      .string({ required_error: 'You should insert a CEP!' })
      .length(8, { message: 'The CEP should be valid!' })

  }) 
});
