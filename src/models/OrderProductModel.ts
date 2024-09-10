import prisma from "@/databases/prisma"
import { ClientType } from "@/types/clientType"
import { OrderProductsType } from "@/types/orderProductsType"
import { OrderType } from "@/types/orderType"
import { ProductType } from "@/types/productType"
import { UserType } from "@/types/userType"

function model() {

    

    return {

        query: prisma.clients,

        upsertMany: async(itens: OrderProductsType[]) => {

            if(!itens || !itens.length || !itens[0].orderId) return null

            const newList = itens.map(e => ({ ...e, createdAt: e.createdAt || undefined, updatedAt: e.createdAt || undefined })) 

            await prisma.orderProducts.deleteMany({
                where: {
                    orderId: itens[0].orderId
                }
            })

            const data = await prisma.orderProducts.createMany({ data: newList })

            return data

            
        },

        delete: async(id: number) => {

            const data = await prisma.clients.delete({

                where: {
                    id: id
                },

            })

            return data

        },

    }

}

export const OrderProductModel = model();