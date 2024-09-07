import NextAuth, { CredentialsSignin } from "next-auth";
import { authConfig } from "./auth.config";
import CredentialsProvider from "next-auth/providers/credentials";
import { API_URL } from "./configs/global";
import { createData } from "./core/http-service/http-service";
import { Login } from "./app/(auth)/login/types/login.types";
import { AuthUser } from "./types/user.interface";
import { JWT } from "next-auth/jwt";
import { Problem } from "./types/http-errors.interface";

declare module "next-auth" {
    interface User {
        accessToken: string;
    }

    interface session {
        user: AuthUser;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        user: AuthUser;
    }
}

export class AuthroizeError extends CredentialsSignin {
    problem: Problem;
    constructor(err: Problem) {
        super();
        this.problem = err;
    }
}


export const {
    signIn,
    signOut,
    auth,
    handlers: {
        GET,
        POST

    }

} = NextAuth({
    ...authConfig,
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'text' }
            },

            async authorize(credentials) {


                try {
                    const user = await createData<Login, AuthUser>(
                        `${API_URL}auth/login`,
                        {
                            email: credentials.email as string,
                            password: credentials.password as string,
                        }

                    );

                    return {
                        name: user.data.user.name,
                        email: user.data.user.email,
                        accessToken: user.data.token,
                    };
                } catch (error: unknown) {
                    // throw new Error('')
                    throw new AuthroizeError(error as Problem);
                }
            },
        })



    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {

                token.accessToken = user.accessToken

            }



            return token;
        },
        async session({ session, token }) {


            session.user.accessToken = token.accessToken as string

            return session;
        },
    },

})