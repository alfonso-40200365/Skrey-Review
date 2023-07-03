import { PurchaseQuery } from "../queries/PurchaseQuery"; 
import { PurchaseMutation } from "../mutations/PurchaseMutation" 

export const  PurchaseResolver = {
  Query:  PurchaseQuery,
  Mutation:  PurchaseMutation
}