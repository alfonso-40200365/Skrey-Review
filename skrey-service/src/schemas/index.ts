import { ClientSchema } from "./ClientSchema"
import { DefaultSchema } from "./DefaultSchema" 
import { FeedbackSchema } from "./FeedbackSchema" 
import { ProductSchema } from "./ProductSchema"
import { PurchaseSchema } from "./PurchaseSchema"
import { StoreSchema } from "./StoreSchema" 

export const schema = [DefaultSchema, FeedbackSchema, StoreSchema, ProductSchema, ClientSchema, PurchaseSchema] 
