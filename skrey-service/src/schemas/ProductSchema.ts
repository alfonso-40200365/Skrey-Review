import { gql } from 'apollo-server'

export const ProductSchema = gql`
    type Product {
        id: ID!,
        storeId: String!,
        name: String!,
        link: String!
    }

    input CreateProductInput {
        name: String!,
        link: String!
    }

    extend type Query {
        products(storeId: String): [Product]
        product(id: String!, storeId: String!): Store
    }

    extend type Mutation {
        createProduct(storeId: String!, input: CreateProductInput!): Product
        deleteProduct(id: String!, storeId: String!): Product 
    }
`