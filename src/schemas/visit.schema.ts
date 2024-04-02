import { z } from 'zod';

export const createVisitSchema = z.object({
  body: z.object({
    property_id: z
      .number({ required_error: 'You should insert a property id!' })
      .min(1, { message: 'The property id should be greater than 0!' }),
    customer_id: z
      .number({ required_error: 'You should insert a property id!' })
      .min(1, { message: 'The property id should be greater than 0!' }),
    visit_date: z
      .coerce
      .date({ required_error: 'You should insert a visit date!' }),
    visit_realized: z
      .coerce
      .boolean({ required_error: 'You should insert if visit was realized!' })
  })
});

export const updateVisitSchema = z.object({
  query: z.object({
    customer_id: z
      .coerce
      .number({ required_error: 'You should insert a customer id!' })
      .min(1, { message: 'The customer id should be greater than 0!' }),
    property_id: z
      .coerce
      .number({ required_error: 'You should insert a property id!' })
      .min(1, { message: 'The property id should be greater than 0!' })
  }),
  body: z.object({
    property_id: z
      .number({ required_error: 'You should insert a property id!' })
      .min(1, { message: 'The property id should be greater than 0!' }),
    customer_id: z
      .number({ required_error: 'You should insert a property id!' })
      .min(1, { message: 'The property id should be greater than 0!' }),
    visit_date: z
      .coerce
      .date({ required_error: 'You should insert a visit date!' }),
    visit_realized: z
      .coerce
      .boolean({ required_error: 'You should insert if visit was realized!' })
  })
});

export const getByCostumerIdAndPropertyIdSchema = z.object({
  params: z.object({
    customer_id: z
      .coerce
      .number({ required_error: 'You should insert a customer id!' })
      .min(1, { message: 'The customer id should be greater than 0!' }),
    property_id: z
      .coerce
      .number({ required_error: 'You should insert a property id!' })
      .min(1, { message: 'The property id should be greater than 0!' })
  })
});

export const deleteVisitSchema = z.object({
  query: z.object({
    customer_id: z
      .coerce
      .number({ required_error: 'You should insert a customer id!' })
      .min(1, { message: 'The customer id should be greater than 0!' }),
    property_id: z
      .coerce
      .number({ required_error: 'You should insert a property id!' })
      .min(1, { message: 'The property id should be greater than 0!' })
  })
});
