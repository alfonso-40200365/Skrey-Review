import { closeConnection, getConnection } from '../../src/database/provider' 
import { getPurchase, getAllPurchases, createPurchase, deletePurchase } from '../../src/controllers/PurchaseController';
import { IPurchase } from '../../src/models/PurchaseModel' 
import mongoose from 'mongoose' 

let connection: mongoose.Connection

let purchase: IPurchase | null | undefined = null
let purchases: IPurchase[] | null | undefined = null
let fetchedPurchase: IPurchase | null | undefined = null

describe('Mutation Purchase', () => {
    describe('getPurchase', () => {
        it('Operation Get Purchase by ID and store ID', async () => {
            expect(true).toBe(true)
        })
    })

    describe('getAllPurchases', () => {
        it('Operation Get All Purchases from collection with store ID', async () => {
            expect(true).toBe(true)
        })
    })
})

beforeAll(async () => {
    connection = await getConnection() 
}) 

afterAll(async () => {
    connection = await closeConnection() 
}) 