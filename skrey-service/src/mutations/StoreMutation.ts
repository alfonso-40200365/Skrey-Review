import { createStore, updateStore, deleteStore} from '../controllers/StoreController' 

export const StoreMutation = {
    createStore: {
        resolve: async (parent: any, args: any, context: any, info: any) => {
            return await createStore(context.dbConn, args.userId, args.input)
        }
    }, 
    updateStore: {
        resolve: async (parent: any, args: any, context: any, info: any) => {
            return await updateStore(context.dbConn, args.id, args.userId, args.input)
        }
    },
    deleteStore: {
        resolve: async (parent: any, args: any, context: any, info: any) => {
            return await deleteStore(context.dbConn, args.id, args.userId)
        }
    }
}