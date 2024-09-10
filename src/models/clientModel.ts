import prisma from "@/databases/prisma"
import { ClientType } from "@/types/clientType"
import { OrderType } from "@/types/orderType"
import { ProductType } from "@/types/productType"
import { UserType } from "@/types/userType"

function model() {

    

    return {

        query: prisma.clients,

        find: async(input: any) => {

            const data = await prisma.clients.findFirst({

                where: {
                    OR: [
                        { id: input }, 
                        { name:{ contains: input } }, 
                        { email:{ contains: input } }, 
                        { document:{ contains: input } }, 
                        { number:{ contains: input } }
                    ],
                },
                include: { orders: true },

            })

            return data

        },

        get: async(input?: string) => {

            const data = await prisma.clients.findMany({

                where: {
                    OR: [
                        { name:{ contains: input } }, 
                        { email:{ contains: input } }, 
                        { document:{ contains: input } }, 
                        { number:{ contains: input } }
                    ],
                },
                include: { orders: true },
                orderBy: { id: 'desc'}

            }) || []

            return data

        },

        upsert: async(item: ClientType) => {

            const created = await prisma.clients.upsert({
                where: {
                    id: item.id || -1
                },
                update: item,
                create: item

            })

            return created
            
        },

        delete: async(id: number) => {

            const data = await prisma.clients.delete({

                where: {
                    id: id
                },

            })

            return data

        },

        paginated: async(index: number, limit: number, input: any = null, startDate: any = '', endDate: any = '') => {

            const data = await prisma.clients.findMany({

                where: {
                    OR: [
                        { name:{ contains: input } }, 
                        { email:{ contains: input } }, 
                        { document:{ contains: input } }, 
                        { number:{ contains: input } }
                    ],
                    createdAt: {
                        gte: startDate !== '' ? new Date(startDate)  : undefined,
                        lte: endDate !== '' ? new Date(endDate) : undefined,
                    },
                },
                skip: index,
                take: limit,
                include: { orders: true },
                orderBy: { id: 'desc'}

            }) || []

            const total = await prisma.clients.count({
                where: {
                    OR: [
                        { name:{ contains: input } }, 
                        { email:{ contains: input } }, 
                        { document:{ contains: input } }, 
                        { number:{ contains: input } }
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

export const ClientModel = model();