import {z} from 'zod';
import { signinSchema } from './signin-schema';

export type SignIn = z.infer<typeof signinSchema>