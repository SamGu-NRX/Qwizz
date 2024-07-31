import * as z from 'zod'

const noSpaces = (value: string) => {
  if (value.includes(' ')) {
    return false
  } else {
    return true
  }
}

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(1, {
      message: 'Password is required'
    })
    .refine(noSpaces, {
      message: 'Password cannot contain spaces'
    })
})

export const RegisterSchema = z.object({
  firstName: z.string().min(1, {
    message: 'Name is required'
  }).max(30, {
    message: 'Name is too long'
  }),
  lastName: z.string().min(1, {
    message: 'Name is required'
  }).max(30, {
    message: 'Name is too long'
  }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, {
      message: 'Password cannot be shorter than 8 characters'
    })
    .max(32, {
      message: 'Password cannot be longer than 32 characters'
    })
    .refine(noSpaces, {
      message: 'Password cannot contain spaces'
    }),
})

export const ResetSchema = z.object({
  email: z.string().email({
    message: 'Email is required'
  })
})

export const NewPasswordSchema = z.object({
  password: z
    .string()
    .min(8, {
      message: 'Minimum 8 characters'
    })
    .refine(noSpaces, {
      message: 'Password cannot contain spaces'
    })
})

export const FormDataSchema = z.object({
  gradeLevel: z.string().min(1, 'Grade level is required'),
  subject: z.string().min(1, 'Subject is required'),
  uploadedText: z.string().optional(),
})