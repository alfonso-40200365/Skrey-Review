import { closeConnection, getConnection } from '../../src/database/provider' 
import { getProduct, getAllProducts, createProduct, deleteProduct } from '../../src/controllers/ProductController';
import { IProduct } from '../../src/models/ProductModel' 
import mongoose from 'mongoose' 

let connection: mongoose.Connection

let product: IProduct | null | undefined = null
let products: IProduct[] | null | undefined = null
let fetchedProduct: IProduct | null | undefined = null

describe('Query Product', () => {
    describe('getProduct', () => {
        it('Operation Get Product by ID', async () => {
            if (product !== null && product !== undefined) {
                fetchedProduct = await getProduct(connection, product.id, product.storeId!) 

                if (fetchedProduct !== null && fetchedProduct !== undefined) {
                    expect(fetchedProduct).toBeDefined() 
                    expect(fetchedProduct.id).toEqual(product.id) 
                }
            }
        })
    })

    describe('getAllProducts', () => {
        it('Operation Get All Products from collection with store ID', async () => {
            if (product !== null && product !== undefined) {
                products = await getAllProducts(connection, product.storeId!) 

                if (products !== null && products !== undefined) {
                    expect(products).toBeDefined() 
                    expect(Array.isArray(products)).toBe(true) 
                }
            }
        })
    })
})

beforeAll(async () => {
    connection = await getConnection() 

    const productArgs: Partial<IProduct> = {
        name: 'Smartphone Apple iPhone 14 Pro Max 6.7" 128GB Roxo Escuro',
        link: 'iphone-14-pro-max-128-roxo'
    }

    product = await createProduct(connection, '646cce1cb41d755c78ef8c9f', productArgs as Omit<IProduct, 'id'>)
}) 

afterAll(async () => {
    if (product !== null && product !== undefined) {
        await deleteProduct(connection, product.id, '646cce1cb41d755c78ef8c9f')
    }

    connection = await closeConnection() 
}) 