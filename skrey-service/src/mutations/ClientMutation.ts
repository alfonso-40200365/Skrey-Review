import { createClient, deleteClient} from '../controllers/ClientController'

export const ClientMutation = {
    createClient: {
        resolve: async (parent: any, args: any, context: any, info: any) => {
            return await createClient(context.dbConn, args.input)
        }
    }, 
    deleteClient: {
        resolve: async (parent: any, args: any, context: any, info: any) => {
            return await deleteClient(context.dbConn, args.id)
        }
    }
}