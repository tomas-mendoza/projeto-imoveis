import { z } from 'zod';

export const createPersonSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: 'You should insert a name!' })
      .min(3, { message: 'The name should be greater than 2 characters!' }),
    cpf: z
      .string({ required_error: 'You should insert a CPF!' })
      .length(11, { message: 'The CPF should have 11 characters!' }),
    cnpj: z
      .string()
      .length(14, { message: 'The CNPJ should have 14 characters!' })
      .optional(),
    birthdate: z
      .coerce
      .date({ required_error: 'You should insert a birthdate!' })
  })
});

export const updatePersonSchema = z.object({  
  params: z.object({
    id: z
      .coerce
      .number({ required_error: 'You should insert an id!' })
      .min(1, { message: 'The id should be greater than 0!' })
  }),
  body: z.object({
    name: z
      .string({ required_error: 'You should insert a name!' })
      .min(3, { message: 'The name should be greater than 2 characters!' }),
    cpf: z
      .string({ required_error: 'You should insert a CPF!' })
      .length(11, { message: 'The CPF should have 11 characters!' }),
    cnpj: z
      .string()
      .length(14, { message: 'The CNPJ should have 14 characters!' })
      .optional(),
    birthdate: z
      .coerce
      .date({ required_error: 'You should insert a birthdate!' })
  })
});
