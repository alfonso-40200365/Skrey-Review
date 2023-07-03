import mongoose from 'mongoose'
import PurchaseModel, { IPurchase, IProductOrID } from '../models/PurchaseModel'
import { IClient } from '../models/ClientModel'
import { IProduct } from '../models/ProductModel'

import { createClient } from './ClientController'
import { getProduct, createProduct } from './ProductController'

import { ApolloError } from 'apollo-server'


export const getAllPurchases = async (connection: mongoose.Connection, storeId: string) => {
    let purchases: IPurchase[]

    try {
        purchases = await PurchaseModel(connection)
            .find({ storeId })

        if (purchases != null && purchases.length > 0) {
            return purchases.map(Purchase => {
                return Purchase.transform()
            })
        }
    } catch (error) {
        console.error("> getAllPurchases error: ", error)
        throw new ApolloError("Error retrieving all  Purchases")
    }
}

export const getPurchase = async (connection: mongoose.Connection, id: string, storeId: string) => {
    let purchase: IPurchase | null

    try {
        purchase = await PurchaseModel(connection)
            .findOne({ _id: id, storeId: storeId })

        if (purchase != null) {
            return purchase.transform()
        }

    } catch (error) {
        console.error("> get Purchase error: ", error)
        throw new ApolloError("Error retrieving  Purchase with id: " + id)
    }
}

export const createPurchase = async (connection: mongoose.Connection, args: Omit<IPurchase, 'id'>) => {
    let purchase: IPurchase | null | undefined
    let client: IClient | null | undefined
    let products: IProductOrID[] = []

    const purchaseArgs: IPurchase = {
        ...args,
        id: '',
        timeStamp: args.timeStamp || new Date(),
    }

    const { clientId, productId } = args

    try {

        if (clientId.name && clientId.email) {
            const clientArgs = {
                name: clientId.name,
                email: clientId.email
            } as IClient

            client = await createClient(connection, clientArgs)

        }

        if (productId && productId.length > 0) {
            for (const productItem of productId) {
                if (productItem.id && productItem.id !== '') {
                    const product = await getProduct(connection, productItem.id, purchaseArgs.storeId)

                    if (!product) {
                        throw new ApolloError(`Product with ID ${productItem.id} does not exist`)
                    }

                    products.push({ id: product.id })
                } else if (productItem.newProduct) {
                    const newProduct = productItem.newProduct as IProduct
                    const product = await createProduct(connection, purchaseArgs.storeId, newProduct)

                    if (product) {
                        products.push({ id: product.id })
                    }
                }
            }
        }

        if (client && products) {
            purchaseArgs.clientId.id = client.id
            purchaseArgs.productId = products
        }

        purchase = await PurchaseModel(connection).create(purchaseArgs)

        if (purchase != null) {
            return purchase.transform()
        }
    } catch (error) {
        console.error('> createPurchase error: ', error)
        throw new ApolloError('Error saving Purchase')
    }
}


export const deletePurchase = async (connection: mongoose.Connection, id: String, storeId: string,) => {
    let purchase: IPurchase | null

    try {
        purchase = await PurchaseModel(connection).findOneAndDelete({ _id: id, storeId: storeId })

        if (purchase != null) {
            return purchase.transform()
        }

    } catch (error) {
        console.error("> deleteStore error: ", error)
        throw new ApolloError("Error deleting Store with id: " + id)
    }

}