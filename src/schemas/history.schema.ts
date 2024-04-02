import { z } from 'zod';

export const createHistorySchema = z.object({
  body: z.object({
    property_id: z
      .number({ required_error: 'You should insert a property!' })
      .min(1, { message: 'The property id should be greater than 0!' }),
    customer_id: z
      .number({ required_error: 'You should insert an customer!' })
      .min(1, { message: 'The customer id should be greater than 0!' }),
    broker_id: z
      .number({ required_error: 'You should insert a broker!' })
      .min(1, { message: 'The broker id should be greater than 0!' }),
    negotiation_date: z
      .coerce
      .date({ required_error: 'You should insert a birthdate!' }),
    commission_perc: z
      .coerce
      .number({ required_error: 'You should insert a commission percentual!' })
      .min(0, { message: 'The commission percentual should be greater than 0!' })
  })
});

export const updateHistorySchema = z.object({
  params: z.object({
    id: z
      .coerce
      .number({ required_error: 'You should insert an id!' })
      .min(1, { message: 'The id should be greater than 0!' })
  }),
  body: z.object({
    property_id: z
      .number({ required_error: 'You should insert a property!' })
      .min(1, { message: 'The property id should be greater than 0!' }),
    customer_id: z
      .number({ required_error: 'You should insert an customer!' })
      .min(1, { message: 'The customer id should be greater than 0!' }),
    broker_id: z
      .number({ required_error: 'You should insert a broker!' })
      .min(1, { message: 'The broker id should be greater than 0!' }),
    negotiation_date: z
      .coerce
      .date({ required_error: 'You should insert a birthdate!' }),
    commission_perc: z
      .coerce
      .number({ required_error: 'You should insert a commission percentual!' })
      .min(0, { message: 'The commission percentual should be greater than 0!' })
  })
});