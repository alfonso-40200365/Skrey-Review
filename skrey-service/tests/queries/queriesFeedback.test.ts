import { closeConnection, getConnection } from '../../src/database/provider' 
import { getFeedback, getAllFeedbacks, createFeedback, deleteFeedback } from '../../src/controllers/FeedbackController'
import { IFeedback } from '../../src/models/FeedbackModel' 
import mongoose from 'mongoose' 

let connection: mongoose.Connection

let feedback: IFeedback | null | undefined = null 
let feedbacks: IFeedback[] | null | undefined = null 
let fetchedFeedback: IFeedback | null | undefined = null 


describe('Query Feedback', () => {
    describe('getFeedback', () => {
        it('Operation Get Feedback by ID', async () => {
            if (feedback !== null && feedback !== undefined) {
                fetchedFeedback = await getFeedback(connection, feedback.id) 

                if (fetchedFeedback !== null && fetchedFeedback !== undefined) {
                    expect(fetchedFeedback).toBeDefined() 
                    expect(fetchedFeedback.id).toEqual(feedback.id) 
                }
            }
        })
    })

    describe('getAllFeedbacks', () => {
        it('Operation Get All Feedbacks from collection', async () => {
            feedbacks = await getAllFeedbacks(connection) 

            if (feedbacks !== null && feedbacks !== undefined) {
                expect(feedbacks).toBeDefined() 
                expect(Array.isArray(feedbacks)).toBe(true) 
            }
        })
    })
})

beforeAll(async () => {
    connection = await getConnection() 

    const feedbackArgs: Partial<IFeedback> = {
        storeId: '646cce1cb41d755c78ef8c9f',
        productId: '647df0d075913d66d2bc86ea',
        clientId:"647dc52e1f049a1efbf48d13" ,
        rating: 5,
        comment: 'This product is great!'
    }
    feedback = await createFeedback(connection, feedbackArgs as Omit<IFeedback, 'id'>) 
}) 
  
afterAll(async () => {
    if (feedback !== null && feedback !== undefined) {
        await deleteFeedback(connection, feedback.id) 
    }
    
    connection = await closeConnection() 
}) 