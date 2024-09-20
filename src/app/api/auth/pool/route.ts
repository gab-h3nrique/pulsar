import prisma from "@/databases/prisma";
import { PoolModel } from "@/models/poolModel";
import { UserModel } from "@/models/userModel";
import { PoolType } from "@/types/poolType";
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


export async function GET(request: Request) {

    try {

        const url = new URL(request.url)
    
        const page = Number(url.searchParams.get('page') || 0)
        const limit = Number(url.searchParams.get('limit') || 0)
        const input = url.searchParams.get('input') || ''
        const startDate = url.searchParams.get('startDate') || ''
        const endDate = url.searchParams.get('endDate') || ''

        if(!page || !limit) {

            const data = await PoolModel.get(input)

            return new Response( JSON.stringify( { success: true, data  } ) , { status: 200 });

        }
    
        const index = (page - 1) * limit
    
        const { data, total } = await PoolModel.paginated(index, limit, input, startDate, endDate)
    
        return new Response( JSON.stringify( { success: true, data, total } ) , { status: 200 });


    } catch(error:any) {

        return new Response( JSON.stringify( { success: false, message: error.message } ) , { status: 500 });
        
    }


}

export async function POST(request: Request) {

    try {

        const req = await request.json()

        if(!req.name) return new Response( JSON.stringify( { success: false, message: 'missing parameters' } ) , { status: 401 });

        const { users, ...rest } = <PoolType>req

        const { users:user, ...created} = await PoolModel.upsert(rest)

        const token = rest?.token ? rest.token : jwt.sign({ name: created.name }, `${process.env.POOL_TOKEN}` as string);

        const updated = await PoolModel.upsert({...created as any, token })

        return new Response( JSON.stringify( { success: true, data: updated } ) , { status: 201 });

    } catch(error:any) {

        return new Response( JSON.stringify( { success: false, message: error.message } ) , { status: 500 });
        
    }

}

export async function DELETE(request: Request) {

    try {

        const id = new URL(request.url).searchParams.get('id') || -1

        if(!id) return new Response( JSON.stringify( { success: false, message: 'id is required!' } ) , { status: 406 });

        const data = await PoolModel.delete(String(id))

        return new Response( JSON.stringify( { success: true, data } ) , { status: 200 });

    } catch(error: any) {

        return new Response( JSON.stringify( { success: false, message: error.message } ) , { status: 500 });
        
    }

}