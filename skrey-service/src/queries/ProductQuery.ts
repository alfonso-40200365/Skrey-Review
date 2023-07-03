import { getAllProducts, getProduct } from '../controllers/ProductController';

export const ProductQuery = {
    products: {
        resolve: async (parent: any, args: any, context: any, info: any) => {
            return await getAllProducts(context.dbConn, args.storeId)
        }
    }, 
    product: {
        resolve: async (parent: any, args: any, context: any, info: any) => {
            return await getProduct(context.dbConn, args.id, args.storeId)
        }
    }
}