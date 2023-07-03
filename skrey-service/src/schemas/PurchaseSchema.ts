import { gql } from 'apollo-server'

export const PurchaseSchema = gql`
scalar Date

type Purchase {
  id: ID!
  clientId: String!
  productId: [String!]!
  storeId: String!
  timeStamp: Date!
}

type Client {
  id: ID!
  name: String!
  email: String
}

type Product {
  id: ID!
  storeId: String!
  name: String!
  link: String!
}

input CreateClientInput {
  name: String!
  email: String!
}

input CreateProductInput {
  name: String!
  link: String!
}

input CreateClientOrIDInput {
  id: String
  newClient: CreateClientInput
}

input CreateProductOrIDInput {
  id: String
  newProduct: CreateProductInput
}

input CreatePurchaseInput {
  clientId: CreateClientOrIDInput!
  productId: [CreateProductOrIDInput!]!
  storeId: String!
  timeStamp: Date
}

extend type Query {
  purchases(storeId: String!): [Purchase]
  purchase(id: String!, storeId: String!): Purchase
}

extend type Mutation {
  createPurchase(input: CreatePurchaseInput!): Purchase
  deletePurchase(id: String!, storeId: String!): Purchase
}

`