import { getAllFeedbacks, getFeedback } from '../controllers/FeedbackController'

export const FeedbackQuery = {
    feedbacks: {
        resolve: async (parent: any, args: any, context: any, info: any) => {
            return await getAllFeedbacks(context.dbConn)
        }
    }, 
    feedback: {
        resolve: async (parent: any, args: any, context: any, info: any) => {
            return await getFeedback(context.dbConn, args.id)
        }
    }
}