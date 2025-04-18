import Cookie from "./cookie";

interface Http {
    (url: string, object?: any, options?: any): Promise<JSON | any>
}

type Options = {
    cache?:RequestCache;
} | null


function fetchApi() {

    const BASE_URL = new URL(process.env.BASE_API_URL as string || 'http://localhost:3000/pulsar/api')

    return {

        get: async (url: string ,object: any = null, init?: RequestInit | undefined): Promise<JSON | any> => {

            const response = await fetch(`${BASE_URL}/${url}` + `${ object ? `?${new URLSearchParams(object)}` : ''}`, {

                method: 'GET',
                // mode: 'no-cors',
                cache: init?.cache || 'no-store',
                // next: { revalidate: init?.next?.revalidate } || undefined,
                headers: init?.headers || {
                    'Access-Control-Allow-Origin': `*`,
                    'Access-Control-Allow-Credentials': `true`,
                    'Access-Control-Allow-Headers': `Content-Type, Authorization`,
                    'Access-Control-Allow-Methods': `GET,DELETE,PATCH,POST,PUT,OPTIONS'`,
                    'Content-Type': 'application/json;charset=utf-8',
                    'Authorization': `Bearer ${await Cookie.get('auth')}`,
                },

            })

            return await response.json()

        },

        post: async (url: string, object: any = null, init?: RequestInit | undefined): Promise<JSON | any> => {

            const response = await fetch(`${BASE_URL}/${url}`, {
                method: 'POST',
                cache: init?.cache || 'no-store',
                // next: { revalidate: init?.next?.revalidate } || undefined,
                headers: init?.headers || {
                    'Allow-Access-Control-Origin': `*`,
                    'Content-Type': 'application/json;charset=utf-8',
                    'Authorization': `Bearer ${await Cookie.get('auth')}`,
                },
                body: JSON.stringify(object)
            })

            return response.json()

        },

        delete: async (url: string, object?: any): Promise<JSON | any> => {

            const response = await fetch(`${BASE_URL}/${url}` + `${ object ? `?${new URLSearchParams(object)}` : ''}`, {
                method: 'DELETE',
                // mode: 'cors',
                headers: {
                    'Allow-Access-Control-Origin': `*`,
                    'Content-Type': 'application/json;charset=utf-8',
                    'Authorization': `Bearer ${await Cookie.get('auth')}`,
                },
            })
            return await response.json()

        }

    }
}

/**
 * `Api` is a fetch factory that provide simple http methods.
 * 
 * It used the same API RESTful design pattern.
 *
 * ```js
 * await Api.post('www.example.products', { name:'table' })
 * // { id:1, name: 'table' }, 
 * 
 * await Api.get('www.example.users/')
 * //[ { name: 'John Doe' },  { name: 'Gabriel Henrique' } ]
 * 
 * await Api.get('www.example.products', { id:1 })
 * // { name: 'Gabriel Henrique' }, 
 * 
 * await Api.delete('www.example.products', { id: 1 })
 * //    { id:1, name:'table' }
 * ```
 *
 * See `www.google.com` for more information.
 * @since v0.1 by [`Gabriel henrique`](https://github.com/gab-h3nrique)
 */
const Api = fetchApi();

export default Api