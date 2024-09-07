'use server'

import { SignIn } from "@/app/(auth)/signin/types/signin.types";
import { OperationResult } from "@/types/opration-result";
import { serverActionWrapper } from "../server-action-wrapper";
import { createData } from "@/core/http-service/http-service";
import { Login } from "@/app/(auth)/login/types/login.types";
import { AuthroizeError, signIn, signOut } from "@/auth";
import { Problem } from "@/types/http-errors.interface";

export async function signInAction(formState: OperationResult<string> | null, formData: FormData) {
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const password_confirmation = formData.get('password_confirmation') as string
    // console.log(email);


    // const validatedData = signinSchema.safeParse({
    //     name: name,
    //     email: email,
    //     password: password,
    //     password_confirmation: password_confirmation

    // })

    // if (!validatedData.success) {
    //     return {
    //         message: 'خطا در سرور'
    //     }


    // } else {

    return serverActionWrapper(async () => await createData<SignIn, string>('/auth/register', {
        name,
        email,
        password,
        password_confirmation,
    }))
    // redirect('/admin_panel');
    // }



}




// export async function loginAction(formState: OperationResult<string> | null, formData: FormData) {

//     const email = formData.get('email') as string
//     const password = formData.get('password') as string
//     // console.log(email);

//     return serverActionWrapper(async () => await createData<Login, string>('/login', {
//         email,
//         password,
//     }))
// }
export async function loginAction(formState: OperationResult<void> | undefined, formData: FormData) {

    try {
        await signIn("credentials", {
            email: formData.get('email'),
            password: formData.get('password'),
            redirect: false,
        });
        return {
            isSuccess: true,
        } satisfies OperationResult<void>
    } catch (error) {
        console.log(error);
      if (error instanceof AuthroizeError) {
        
        return {
            isSuccess: false,
            error: error.problem!
        } satisfies OperationResult<void>
       
      }
      throw new Error('');
      
      
    }
    

    // try {
    //     await signIn('credentials', formData)
    // } catch (error) {
    //     console.log(error);
        

    //     return  {
    //         isSuccess: false,
            
    //     };
    // }
}


export async function logout() {

    // await signOut()

    try {
        await signOut({redirect: false});   
        return {
          isSuccess: true
        } satisfies OperationResult<void>
    } catch (error) {
        throw new Error('');
    }
    
}