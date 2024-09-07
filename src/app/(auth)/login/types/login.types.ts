import { z } from 'zod';
import { loginSchema } from './login-schema';

export type Login = z.infer<typeof loginSchema>