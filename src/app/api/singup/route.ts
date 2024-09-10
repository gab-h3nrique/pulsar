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
    
        if(!req.name || !req.email || !req.password) return new Response( JSON.stringify( { success: false, message: 'missing parameters' } ) , { status: 401 });

        const hasEmail = await prisma.users.findUnique({ where: { email: req.email } })

        if(hasEmail) return new Response( JSON.stringify( { success: false, message: 'this email is already in use' } ) , { status: 401 });

        const hashedPassword = await bcrypt.hash(req.password, 2) 

        const createdUser = await UserModel.create({id: undefined, name: req.name, email: req.email, password: hashedPassword, role: req.role ? Number(req.role) : 200})

        const newUser = {id:createdUser.id, name:createdUser.name, email:createdUser.email};

        const accessToken = jwt.sign(newUser, `${process.env.ACCESS_TOKEN}` as string);
    
        return new Response( JSON.stringify( { success: true, user: newUser, token: accessToken } ) , { status: 200 });


    } catch(error:any) {

        console.error(error)
        return new Response( JSON.stringify( { success: false, message: error.message } ) , { status: 500 });
        
    }

}