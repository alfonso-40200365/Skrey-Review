import { gql } from "apollo-server" 

export const DefaultSchema = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`