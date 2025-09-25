import type { UserCreate, UserUpdate } from '@/features/users/types.ts';
import { Position, Role } from '@/types/common.ts';
import { z } from 'zod';

export const userCreateSchema = () => {
  return z.object({
    firstName: z.string().min(3, 'First name is required'),
    lastName: z.string().min(3, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    username: z
      .string()
      .min(3, 'Username is required')
      .max(16, 'Username must be 16 characters or less'),
    role: z.nativeEnum(Role, { message: 'Role is required' }),
    position: z.nativeEnum(Position, { message: 'Position is required' }).optional(),
  }) satisfies z.ZodType<UserCreate>;
};

export type UserCreateSchema = z.infer<ReturnType<typeof userCreateSchema>>;

export const userUpdateSchema = () => {
  return z.object({
    firstName: z.string().min(3, 'First name is required'),
    lastName: z.string().min(3, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    username: z
      .string()
      .min(3, 'Username is required')
      .max(16, 'Username must be 16 characters or less'),
    role: z.nativeEnum(Role, { message: 'Role is required' }),
    position: z.nativeEnum(Position, { message: 'Position is required' }).optional(),
  }) satisfies z.ZodType<UserUpdate>;
};

export type UserUpdateSchema = z.infer<ReturnType<typeof userUpdateSchema>>;
