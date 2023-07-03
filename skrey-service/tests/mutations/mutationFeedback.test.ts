import { closeConnection, getConnection } from '../../src/database/provider'
import { createFeedback, updateFeedback, deleteFeedback } from '../../src/controllers/FeedbackController'
import { IFeedback } from '../../src/models/FeedbackModel'
import mongoose from 'mongoose'

let connection: mongoose.Connection

let feedbackInput: IFeedback | null | undefined = null
let updateFeedbackInput: IFeedback | null | undefined = null
let deletedFeedbackInput: IFeedback | null | undefined = null

describe('Mutation Feedback', () => {
    describe('createFeedback', () => {
        it('Operation Create for the collection Feedback', async () => {

            const feedbackArgs: Partial<IFeedback> = {
                storeId: '646cce1cb41d755c78ef8c9f',
                productId: '647df0d075913d66d2bc86ea',
                clientId: "647dc52e1f049a1efbf48d13",
                rating: 5,
                comment: 'This product is great!'
            }

            feedbackInput = await createFeedback(connection, feedbackArgs as Omit<IFeedback, 'id'>)

            if (feedbackInput !== null && feedbackInput !== undefined) {
                expect(feedbackInput).toBeDefined()
                expect(feedbackInput.id).toBeDefined()
                expect(feedbackInput.storeId).toEqual('646cce1cb41d755c78ef8c9f')
                expect(feedbackInput.productId).toEqual('647df0d075913d66d2bc86ea')
                expect(feedbackInput.clientId).toEqual('647dc52e1f049a1efbf48d13')
                expect(feedbackInput.rating).toEqual(5)
                expect(feedbackInput.comment).toEqual('This product is great!')
                expect(feedbackInput.verified).toEqual(false)
                expect(feedbackInput.timeStamp).toBeInstanceOf(Date)
            }
        })
    })

    describe('updateFeedback', () => {
        it('Operation Update for the collection Feedback', async () => {
            const updateArgs = {
                verified: true,
            }
            if (feedbackInput !== null && feedbackInput !== undefined) {
                updateFeedbackInput = await updateFeedback(connection, feedbackInput.id, updateArgs)

                if (updateFeedbackInput !== null && updateFeedbackInput !== undefined) {
                    expect(updateFeedbackInput).toBeDefined()
                    expect(updateFeedbackInput.id).toEqual(feedbackInput.id)
                    expect(updateFeedbackInput.verified).toEqual(true)
                }
            }
        })
    })

    describe('deleteFeedback', () => {
        it('Operation Delete for the collection Feedback', async () => {
            if (feedbackInput !== null && feedbackInput !== undefined) {
                deletedFeedbackInput = await deleteFeedback(connection, feedbackInput.id)

                if (deletedFeedbackInput !== null && deletedFeedbackInput !== undefined) {
                    expect(deletedFeedbackInput).toBeDefined()
                    expect(deletedFeedbackInput.id).toEqual(feedbackInput.id)
                }
            }
        })
    })
})

beforeAll(async () => {
    connection = await getConnection()
})

afterAll(async () => {
    connection = await closeConnection()
}) 