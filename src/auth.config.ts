import type { NextAuthConfig } from "next-auth";


export const authConfig = {
    pages: {
        signIn: '/signin'
    },
    callbacks: {
        async authorized({auth, request}) {
            const {nextUrl} = request;

            const isAuthenticated = !!auth?.user;

            const authRoutes = ['/signin', '/login'];
            const isAuthRoutes = authRoutes.includes(nextUrl.pathname);

            if (isAuthRoutes && isAuthenticated) {
                return Response.redirect(new URL('/admin_panel', nextUrl));
            }

            const isProtectedRoute = nextUrl.pathname.startsWith('/admin_panel');

            if (isProtectedRoute && !isAuthenticated) {
                return Response.redirect(new URL('/signin', nextUrl));
            }

            return true;

        }
    },
    providers:[

    ]


} satisfies NextAuthConfig