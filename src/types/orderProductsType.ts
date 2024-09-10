export interface OrderProductsType {

    id?: number,

    productId: number,
    orderId: number,

    status: string,

    warranty: boolean,
    description?: string,

    value: number,

    updatedAt?: string,
    createdAt?: string,

    [x: string]: unknown
    
}

export const EMPTY_ORDER_PRODUCTS = {

    id: undefined,

    productId: -1,
    orderId: -1,

    status: 'em andamento',

    warranty: false,
    description: '',

    value: 0,

    updatedAt: undefined,
    createdAt: undefined,

}

