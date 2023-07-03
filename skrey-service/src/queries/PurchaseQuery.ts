import { getAllPurchases, getPurchase } from '../controllers/PurchaseController';

export const  PurchaseQuery = {
    purchases: {
        resolve: async (parent: any, args: any, context: any, info: any) => {
            return await getAllPurchases(context.dbConn, args.storeId)
        }
    }, 
    purchase: {
        resolve: async (parent: any, args: any, context: any, info: any) => {
            return await getPurchase(context.dbConn, args.id, args.storeId)
        }
    }
}