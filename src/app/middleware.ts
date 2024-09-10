// middleware.ts
// import jwt from 'jsonwebtoken';
import { verify } from '@/utils/jwt';
import { NextRequest, NextResponse } from 'next/server';
// import { Users } from './models/users';

export default async function middleware(req: NextRequest) {

    try {

        // if(!await isAuthenticated(req)) return handleNotAuthenticated(req);

        return NextResponse.next();
        
    } catch(error) {
        
        // return handleNotAuthenticated(req);
    
    }
    
}

//  running middleware on specific paths.
export const config = {
    matcher: ['/app/:path*', '/app/auth/:path*'],
}

async function isAuthenticated(request: NextRequest):Promise<boolean> {

    const authorization :any = request.headers.get('authorization') || request.cookies.get('auth') || '';
    const token = <string>authorization.replace('Bearer ', '');

    if(!token) return false

    const decodedToken = await verify(token, process.env.ACCESS_TOKEN as string)

    return decodedToken.id ? true : false;

}

function handleNotAuthenticated(request: NextRequest): NextResponse | undefined {

    const { pathname } = request.nextUrl

    if (pathname.startsWith('/app')) return NextResponse.redirect(new URL('/login', request.url))
    if (pathname.startsWith('/api')) return NextResponse.redirect(new URL('/api/unauthorized', request.url));

}