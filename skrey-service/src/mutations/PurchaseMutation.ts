import { createPurchase, deletePurchase} from '../controllers/PurchaseController'

export const  PurchaseMutation = {
    createPurchase: {
        resolve: async (parent: any, args: any, context: any, info: any) => {
            return await createPurchase(context.dbConn, args.input)
        }
    }, 
    deletePurchase: {
        resolve: async (parent: any, args: any, context: any, info: any) => {
            return await deletePurchase(context.dbConn, args.id, args.storeId)
        }
    }
}