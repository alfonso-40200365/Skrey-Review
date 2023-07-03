import { getAllStores, getStore } from '../controllers/StoreController'

export const StoreQuery = {
    stores: {
        resolve: async (parent: any, args: any, context: any, info: any) => {
            return await getAllStores(context.dbConn, args.userId)
        }
    }, 
    store: {
        resolve: async (parent: any, args: any, context: any, info: any) => {
            return await getStore(context.dbConn, args.id, args.userId)
        }
    }
}