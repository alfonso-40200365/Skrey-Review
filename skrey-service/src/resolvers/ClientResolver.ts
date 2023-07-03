import { ClientQuery } from "../queries/ClientQuery" 
import { ClientMutation } from "../mutations/ClientMutation" 

export const ClientResolver = {
  Query: ClientQuery,
  Mutation: ClientMutation
}