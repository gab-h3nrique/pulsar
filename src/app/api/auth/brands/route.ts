import { BrandModel } from "@/models/brandModel";
import { BrandType } from "@/types/brandType";

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

        if(!page || !limit) {

            const brands = await BrandModel.get(input)

            return new Response( JSON.stringify( { success: true, brands  } ) , { status: 200 });

        }
    
        const index = (page - 1) * limit
    
        const { brands, total } = await BrandModel.paginated(index, limit, input)
    
        return new Response( JSON.stringify( { success: true, brands, total } ) , { status: 200 });


    } catch(error:any) {

        return new Response( JSON.stringify( { success: false, message: error.message } ) , { status: 500 });
        
    }


}

export async function POST(request: Request) {

    try {

        const req = await request.json()

        if(!req.name || !req.stock) return new Response( JSON.stringify( { success: false, message: 'missing parameters' } ) , { status: 401 });

        const formated = <BrandType>{ ...req }

        const brand = await BrandModel.upsert(formated)

        return new Response( JSON.stringify( { success: true, brand } ) , { status: 201 });

    } catch(error:any) {

        return new Response( JSON.stringify( { success: false, message: error.message } ) , { status: 500 });
        
    }

}

export async function DELETE(request: Request) {

    try {

        const id = new URL(request.url).searchParams.get('id') || -1

        if(!id) return new Response( JSON.stringify( { success: false, message: 'id is required!' } ) , { status: 406 });

        const brand = await BrandModel.delete(Number(id))

        return new Response( JSON.stringify( { success: true, brand } ) , { status: 200 });

    } catch(error:any) {

        return new Response( JSON.stringify( { success: false, message: error.message } ) , { status: 500 });
        
    }

}