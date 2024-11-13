import * as z from 'zod'

// Create zod validation schema for the form

// Schema for basic fields
const baseSchema = z.object({
  name: z.string().min(1, 'String must contain at least 1 character(s)').max(10, 'String must contain at most 10 character(s)'),
  email: z.string().email('Invalid email'),
});

// Schema for price field
const priceSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('fixed'),
    amount: z.number({
      invalid_type_error: 'Expected number, received string'
    }).min(1, 'Expected number, received nan'),
  }),
  z.object({
    type: z.literal('range'),
    amount: z.object({
      min: z.number({
        invalid_type_error: 'Expected number, received string'
      }).min(1, 'Expected number, received nan'),
      max: z.number({
        invalid_type_error: 'Expected number, received string'
      }).min(1, 'Expected number, received nan'),
    }).refine(data => data.min < data.max, {
      message: 'Min must be less than max',
      path: ['min'],
    }),
  }),
]).optional()

// Full schema combining the base fields and price validation
export const formSchema = baseSchema.extend({
  price: priceSchema,
});