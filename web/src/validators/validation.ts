import { z } from 'zod'

export const transactionBodySchema = z.object({
  description: z
    .string()
    .min(1, { message: 'A descrição deve ter pelo menos 1 caracteres' })
    .max(255, { message: 'A descrição deve ter no máximo 255 caracteres' })
    .trim()
    .toLowerCase()
    .regex(/^[a-zA-ZÀ-ú0-9\s.,!?@#$%^&*()_+-=]+$/g, {
      message:
        'A descrição deve conter apenas letras, números e os caracteres especiais: .,!?@#$%^&*()_+-=',
    }),
  price: z.number().min(1, { message: 'O preço deve ser maior que 0' }),
  type: z.enum(['income', 'outcome']),
  category: z
    .string()
    .min(1, { message: 'A categoria deve ter pelo menos 1 caracteres' })
    .max(255, { message: 'A categoria deve ter no máximo 255 caracteres' })
    .trim()
    .toLowerCase()
    .regex(/^[a-zA-ZÀ-ú0-9\s.,!?@#$%^&*()_+-=]+$/g, {
      message:
        'A categoria deve conter apenas letras, números e os caracteres especiais: .,!?@#$%^&*()_+-=',
    }),
})
