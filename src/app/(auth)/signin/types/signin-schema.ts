import { z } from 'zod';


export const signinSchema = z.object({
    name: z.string().min(2, { message: 'نام الزامی است' }),
    email: z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
        message: 'ایمیل باید فرمت صحیحی داشته باشد.',
      }),
      password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message: 'پسورد باید حداقل 8 کاراکتر داشته باشد و شامل حروف بزرگ و کوچک، عدد و یک نماد خاص باشد.',
      }),
      password_confirmation: z.string(),
    })
    .refine((data) => data.password === data.password_confirmation, {
      message: 'تکرار رمز عبور باید با رمز عبور مطابقت داشته باشد.',
      path: ['password_confirmation'], 
    
})