export interface AuthUser {
    data:{

        token: string
    
        user:{
            email: string,
            name: string
        }
    }
}