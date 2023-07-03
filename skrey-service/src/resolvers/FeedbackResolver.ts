import { FeedbackQuery } from "../queries/FeedbackQuery" 
import { FeedbackMutation } from "../mutations/FeedbackMutation" 

export const FeedbackResolver = {
  Query: FeedbackQuery,
  Mutation: FeedbackMutation
}