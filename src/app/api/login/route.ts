import prisma from "@/databases/prisma";
import { UserModel } from "@/models/userModel";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

// 200 OK
// 201 Created
// 202 Accepted
// 203 Non-Authoritative Information
// 204 No Content
// 205 Reset Content
// 206 Partial Content

// 400 Bad Request
// 401 Unauthorized
// 402 Payment Required
// 403 Forbidden
// 405 Method Not Allowed
// 406 Not Acceptable
// 429 Too Many Requests
// 500 Internal Server Error
// 501 Not Implemented
// 502 Bad Gateway
// 503 Service Unavailable


export async function GET(req: Request) {




    return new Response( JSON.stringify( { message: 'hello' } ) , { status: 200 });

}

export async function POST(request: Request) {

    try {


        const req = await request.json()
    
        if(!req.email || !req.password) return new Response( JSON.stringify( { success: false, message: 'missing parameters' } ) , { status: 401 });

        const foundUser = await prisma.users.findUnique({ where: { email: req.email } })

        if(!foundUser) return new Response( JSON.stringify( { success: false, message: 'email ou senha inválidos!' } ) , { status: 401 });

        if(!await bcrypt.compare(req.password, foundUser.password)) return new Response( JSON.stringify( { success: false, message: 'email ou senha inválidos!' } ) , { status: 401 });

        const { password , ...rest } = foundUser

        const accessToken = jwt.sign(rest, `${process.env.ACCESS_TOKEN}` as string);

        return new Response( JSON.stringify( { success: true, user: rest, token: accessToken } ) , { status: 200 });


    } catch(error:any) {

        console.error(error)
        return new Response( JSON.stringify( { success: false, message: error.message } ) , { status: 500 });
        
    }

}