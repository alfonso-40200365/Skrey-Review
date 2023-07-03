import { StoreQuery } from "../queries/StoreQuery" 
import { StoreMutation } from "../mutations/StoreMutation" 

export const StoreResolver = {
  Query: StoreQuery,
  Mutation: StoreMutation,
}