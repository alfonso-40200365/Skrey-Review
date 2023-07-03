import { closeConnection, getConnection } from '../../src/database/provider' 
import { createProduct, deleteProduct } from '../../src/controllers/ProductController';
import { IProduct } from '../../src/models/ProductModel' 
import mongoose from 'mongoose' 

let connection: mongoose.Connection

let productInput: IProduct | null | undefined = null
let deletedProductInput: IProduct | null | undefined = null

describe('Mutation Product', () => {
    describe('createProduct', () => {
        it('Operation Create for the collection Product', async () => {

            const productArgs: Partial<IProduct> = {
                name: 'Smartphone Apple iPhone 14 Pro Max 6.7" 128GB Roxo Escuro',
                link: 'iphone-14-pro-max-128-roxo'
            }

            productInput = await createProduct(connection, '646cce1cb41d755c78ef8c9f', productArgs as Omit<IProduct, 'id'>)

            if (productInput !== null && productInput !== undefined) {
                expect(productInput).toBeDefined()
                expect(productInput.id).toBeDefined()
                expect(productInput.name).toEqual('Smartphone Apple iPhone 14 Pro Max 6.7" 128GB Roxo Escuro')
                expect(productInput.link).toEqual('iphone-14-pro-max-128-roxo')
            }

        })
    })

    describe('deleteProduct', () => {
        it('Operation Delete for the collection Product', async () => {
            if (productInput !== null && productInput !== undefined) {
                deletedProductInput = await deleteProduct(connection, productInput.id, '646cce1cb41d755c78ef8c9f')

                if (deletedProductInput !== null && deletedProductInput !== undefined) {
                    expect(deletedProductInput).toBeDefined()
                    expect(deletedProductInput.id).toEqual(productInput.id)
                }
            }
        })
    })
})

beforeAll(async () => {
    connection = await getConnection() 
}) 

afterAll(async () => {
    connection = await closeConnection() 
}) 