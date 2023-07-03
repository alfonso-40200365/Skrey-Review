import { gql } from 'apollo-server'

export const StoreSchema = gql`
    type Store {
        id: ID!,
        userId: String!,
        name: String!,
        link: String!
    }

    input CreateStoreInput {
        name: String!,
        link: String!
    }

    input UpdateStoreInput {
        name: String,
        link: String
    }

    extend type Query {
        stores(userId: String!): [Store]
        store(id: String!, userId: String!): Store
    }

    extend type Mutation {
        createStore(userId: String!, input: CreateStoreInput!): Store
        updateStore(id: String!, userId: String!, input: UpdateStoreInput!): Store
        deleteStore(id: String!, userId: String!): Store
    }
`