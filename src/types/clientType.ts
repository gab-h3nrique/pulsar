export interface ClientType {

    id?: number,

    name: string,
    email?: string,
    document?: string,
    number?: string,
    info?: string,

    updatedAt?: string,
    createdAt?: string, 
}

export const EMPTY_CLIENT = {

    id: undefined,

    name: '',
    email: undefined,
    document: undefined,
    number: undefined,
    info: undefined,


    updatedAt: undefined,
    createdAt: undefined,

}