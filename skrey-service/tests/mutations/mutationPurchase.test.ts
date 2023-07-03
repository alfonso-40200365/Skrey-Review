import { closeConnection, getConnection } from '../../src/database/provider' 
import { createPurchase, deletePurchase } from '../../src/controllers/PurchaseController';
import { IPurchase } from '../../src/models/PurchaseModel' 
import mongoose from 'mongoose' 

let connection: mongoose.Connection

let purchaseInput: IPurchase | null | undefined = null
let deletedPurchaseInput: IPurchase | null | undefined = null

describe('Mutation Purchase', () => {
    describe('createPurchase', () => {
        it('Operation Create for the collection Purchase', async () => {
            expect(true).toBe(true)
        })
    })

    describe('deletePurchase', () => {
        it('Operation Delete for the collection Purchase', async () => {
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