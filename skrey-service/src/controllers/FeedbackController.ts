import mongoose from 'mongoose' 
import FeedbackModel, { IFeedback } from '../models/FeedbackModel'
import { ApolloError } from 'apollo-server'

export const getAllFeedbacks = async (connection: mongoose.Connection) => {
    let feedbacks: IFeedback[]

    try {
        feedbacks = await FeedbackModel(connection)
            .find()

        if (feedbacks != null && feedbacks.length > 0) {
            return feedbacks.map(feedback => {
                return feedback.transform()
            })
        }

    } catch (error) {
        console.error("> getAllFeedbacks error: ", error)
        throw new ApolloError("Error retrieving all Feedback")
    }
}

export const getFeedback = async (connection: mongoose.Connection, id: string) => {
    let feedback: IFeedback | null

    try {
        feedback = await FeedbackModel(connection)
            .findById(id)

        if (feedback != null) {
            return feedback.transform()
        }
        
    } catch (error) {
        console.error("> getFeedback error: ", error) 
        throw new ApolloError("Error retrieving Feedback with id: " + id) 
    }
}

export const createFeedback = async (connection: mongoose.Connection, args: Omit<IFeedback, 'id'>) => {
    let feedback: IFeedback | null | undefined

    const feedbackArgs: IFeedback = {
        ...args,
        id: '',
        timeStamp: args.timeStamp || new Date(),
        verified: args.verified ?? false,
    }

    try {
        feedback = await FeedbackModel(connection).create(feedbackArgs)

        if (feedback != null) {
            return feedback.transform()
        }
    
    } catch (error) {
        console.error("> createFeedback error: ", error) 
        throw new ApolloError("Error saving Feedback") 
    }
}

export const updateFeedback = async (connection: mongoose.Connection, id: string, args: any) => {
    let feedback: IFeedback | null | undefined

    try {
        feedback = await FeedbackModel(connection).findByIdAndUpdate(
            id,
            { verified: args.verified },
            { new: true }
        )

        if (feedback != null) {
            return feedback.transform() 
        }

    } catch (error) {
        console.error("> updateFeedback error: ", error) 
        throw new ApolloError("Error updating Feedback with id: " + id) 
    }
}

export const deleteFeedback = async (connection: mongoose.Connection, id: string) => {
    let feedback: IFeedback | null | undefined

    try {
        feedback = await FeedbackModel(connection).findByIdAndRemove(id) 

        if (feedback != null) {
            return feedback.transform() 
        }
        
    } catch (error) {
        console.error("> deleteFeedback error: ", error) 
        throw new ApolloError("Error deleting Feedback with id: " + id) 
    }
}