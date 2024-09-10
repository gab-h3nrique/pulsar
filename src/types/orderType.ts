import { empty } from "@prisma/client/runtime/library";
import { ClientType, EMPTY_CLIENT } from "./clientType";
import { ProductType } from "./productType";
import { UserType } from "./userType";
import { OrderProductsType } from "./orderProductsType";

export interface OrderType {

    id?: number,

    client?: ClientType,
    clientId?: number,

    user?: ClientType,
    userId?: string,


    model: string,
    year?: number,
    plateNumber?: string,

    clientObservation?: string,
    defectDescription?: string,
    technicalReport?: string,

    warranty: boolean,
    warrantyDescription?: string,

    status: string,
    value:  number,

    orderProducts?: OrderProductsType[],

    updatedAt?: string,
    createdAt?: string,
}

export const EMPTY_ORDER = {

    id: undefined,

    client: EMPTY_CLIENT,
    clientId: undefined,

    user: undefined,
    userId: undefined,


    model: '',
    year: undefined,
    plateNumber: undefined,

    clientObservation: undefined,
    defectDescription: undefined,
    technicalReport: undefined,

    warranty: false,
    warrantyDescription: undefined,

    status: 'em andamento',
    value: 0,

    orderProducts: [],

    updatedAt: undefined,
    createdAt: undefined,

}