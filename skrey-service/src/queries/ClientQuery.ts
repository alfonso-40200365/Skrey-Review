import { getAllClients, getClient } from '../controllers/ClientController';

export const ClientQuery = {
    clients: {
        resolve: async (parent: any, args: any, context: any, info: any) => {
            return await getAllClients(context.dbConn)
        }
    }, 
    client: {
        resolve: async (parent: any, args: any, context: any, info: any) => {
            return await getClient(context.dbConn, args.id)
        }
    }
}