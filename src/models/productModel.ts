import prisma from "@/databases/prisma"
import { ProductType } from "@/types/productType"
import { UserType } from "@/types/userType"

function model() {

    

    return {

        query: prisma.products,

        find: async(input: any) => {

            const product = await prisma.products.findFirst({

                where: {
                    OR: [
                        { id: input }, 
                        { name:{ contains: input } }, 
                        { type:{ contains: input } }, 
                        { brand:{ contains: input } }, 
                    ],
                },

            })

            return product

        },

        get: async(input?: string) => {

            const data = await prisma.products.findMany({

                where: {
                    OR: [
                        { name:{ contains: input } }, 
                        { type:{ contains: input } }, 
                        { brand:{ contains: input } }, 
                    ],
                },
                orderBy: { id: 'desc'}

            }) || []

            return data

        },

        upsert: async(product: ProductType) => {

            const created = await prisma.products.upsert({
                where: {
                    id: product.id
                },
                update: product,
                create: product

            })

            return created
            
        },

        delete: async(id: number) => {

            const product = await prisma.products.delete({

                where: {
                    id: id
                },

            })

            return product

        },

        paginated: async(index: number, limit: number, input: string = '', startDate: any = '', endDate: any = '') => {

            const data = await prisma.products.findMany({

                where: {
                    OR: [
                        { name:{ contains: input } }, 
                        { type:{ contains: input } }, 
                        { brand:{ contains: input } }, 
                    ],
                    createdAt: {
                        gte: startDate !== '' ? new Date(startDate)  : undefined,
                        lte: endDate !== '' ? new Date(endDate) : undefined,
                    },
                },
                skip: index,
                take: limit,
                orderBy: { id: 'desc'}

            }) || []

            const total = await prisma.products.count({
                where: {
                    OR: [
                        { name:{ contains: input } }, 
                        { type:{ contains: input } }, 
                        { brand:{ contains: input } }, 
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

export const ProductModel = model();