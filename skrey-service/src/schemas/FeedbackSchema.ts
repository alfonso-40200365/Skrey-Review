import { gql } from 'apollo-server'

export const FeedbackSchema = gql`
    scalar Date

    type Feedback {
        id: ID!,
        storeId: String!,
        productId: String!
        clientId: String!,
        rating: Int!,
        comment: String,
        verified: Boolean!,
        timeStamp: Date!
    }

    input CreateFeedbackInput {
        storeId: String!,
        productId: String!
        clientId: String,
        rating: Int!,
        comment: String,
        verified: Boolean,
        timeStamp: Date
    }

    input UpdateFeedbackInput {
        verified: Boolean!
    }

    extend type Query {
        feedbacks: [Feedback]
        feedback(id: String!): Feedback
    }

    extend type Mutation {
        createFeedback(input: CreateFeedbackInput!): Feedback
        updateFeedback(id: String!, input: UpdateFeedbackInput!): Feedback
        deleteFeedback(id: String!): Feedback
    }
`