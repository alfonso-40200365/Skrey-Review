import { createFeedback, updateFeedback, deleteFeedback} from '../controllers/FeedbackController'

export const FeedbackMutation = {
    createFeedback: {
        resolve: async (parent: any, args: any, context: any, info: any) => {
            return await createFeedback(context.dbConn, args.input)
        }
    }, 
    updateFeedback: {
        resolve: async (parent: any, args: any, context: any, info: any) => {
            return await updateFeedback(context.dbConn, args.id, args.input)
        }
    },
    deleteFeedback: {
        resolve: async (parent: any, args: any, context: any, info: any) => {
            return await deleteFeedback(context.dbConn, args.id)
        }
    }
}