import { createProduct, deleteProduct} from '../controllers/ProductController'

export const ProductMutation = {
    createProduct: {
        resolve: async (parent: any, args: any, context: any, info: any) => {
            return await createProduct(context.dbConn, args.storeId, args.input)
        }
    }, 
    deleteProduct: {
        resolve: async (parent: any, args: any, context: any, info: any) => {
            return await deleteProduct(context.dbConn, args.id, args.storeId)
        }
    }
}