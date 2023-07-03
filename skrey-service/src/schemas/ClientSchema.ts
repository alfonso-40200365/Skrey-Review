import { gql } from 'apollo-server'

export const ClientSchema = gql`
    type Client {
        id: ID!,
        name: String!,
        email: String!
    }

    input CreateClientInput {
        name: String!,
        email: String!
    }

    extend type Query {
        clients: [Client]
        client(id: String!): Client
    }

    extend type Mutation {
        createClient(input: CreateClientInput!): Client
        deleteClient(id: String!): Client
    }
`