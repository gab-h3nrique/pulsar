import prisma from "@/databases/prisma"
import { OrderType } from "@/types/orderType"
import { ProductType } from "@/types/productType"
import { UserType } from "@/types/userType"
import { ClientModel } from "./clientModel"
import { OrderProductModel } from "./OrderProductModel"

function model() {

    

    return {

        query: prisma.orders,

        find: async(input: any) => {

            const data = await prisma.orders.findFirst({

                where: {
                    OR: [
                        { id: input }, 
                        { model:{ contains: String(input) } }, 
                        { client:{ name: { contains: String(input) }} }, 
                        { client:{ email: { contains: String(input) }} }, 
                    ],
                },
                include: { user: true, client: true, orderProducts: true },

            })

            return data

        },

        get: async(input?: string) => {

            const data = await prisma.orders.findMany({

                where: {
                    OR: [
                        { model:{ contains: input } }, 
                        { client:{ name: { contains: input }} }, 
                        { client:{ email: { contains: input }} }, 
                    ],
                },
                include: { user: true, client: true, orderProducts: true },
                orderBy: { id: 'desc'}

            }) || []

            return data

        },

        upsert: async(item: OrderType) => {

            const { user, client, orderProducts, ...rest } = item

            const data = await prisma.orders.upsert({
                where: {
                    id: item.id || -1
                },
                update: rest,
                create: rest,
                include: { user: true, client: true, orderProducts: true }
            })

            return data
            
        },

        delete: async(id: number) => {

            const data = await prisma.orders.delete({

                where: {
                    id: id
                },

            })

            return data

        },

        paginated: async(index: number, limit: number, input: any = null, startDate: any = '', endDate: any = '') => {

            const data = await prisma.orders.findMany({

                where: {
                    OR: [
                        { model:{ contains: input } }, 
                        { client:{ name: { contains: input }} }, 
                        { client:{ email: { contains: input }} }, 
                    ],
                    createdAt: {
                        gte: startDate !== '' ? new Date(startDate)  : undefined,
                        lte: endDate !== '' ? new Date(endDate) : undefined,
                    },
                },
                skip: index,
                take: limit,
                include: { user: true, client: true, orderProducts: true },
                orderBy: { id: 'desc'}

            }) || []

            const total = await prisma.orders.count({
                where: {
                    OR: [
                        { model:{ contains: input } }, 
                        { client:{ name: { contains: input }} }, 
                        { client:{ email: { contains: input }} }, 
                    ],
                    createdAt: {
                        gte: startDate !== '' ? new Date(startDate)  : undefined,
                        lte: endDate !== '' ? new Date(endDate) : undefined,
                    },
                },
            }) || 0

            return { data, total }

        }

    }

}

export const OrderModel = model();