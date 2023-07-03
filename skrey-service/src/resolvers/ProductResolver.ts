import { ProductQuery } from "../queries/ProductQuery" 
import { ProductMutation } from "../mutations/ProductMutation" 

export const ProductResolver = {
  Query: ProductQuery,
  Mutation: ProductMutation
}