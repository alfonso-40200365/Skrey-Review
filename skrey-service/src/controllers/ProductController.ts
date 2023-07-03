import mongoose from 'mongoose'
import ProductModel, { IProduct } from '../models/ProductModel'
import { ApolloError } from 'apollo-server'


export const getAllProducts = async (connection: mongoose.Connection, storeId: string) => {
    let products: IProduct[]

    try {
        if (storeId) {
            products = await ProductModel(connection)
            .find({ storeId })
        }
        else {
            products = await ProductModel(connection)
            .find()
        }

        if (products != null && products.length > 0) {
            return products.map(product => {
                return product.transform()
            })
        }
    } catch (error) {
        console.error("> getAllProducts error: ", error)
        throw new ApolloError("Error retrieving all Products")
    }
}

export const getProduct = async (connection: mongoose.Connection, id: string, storeId: string) => {
    let product: IProduct | null | undefined

    try {
        product = await ProductModel(connection)
            .findOne({ _id: id, storeId: storeId })

        if (product != null) {
            return product.transform()
        }

    } catch (error) {
        console.error("> getProduct error: ", error)
        throw new ApolloError("Error retrieving Product with id: " + id)
    }
}

export const createProduct = async (connection: mongoose.Connection, storeId: string, args: Omit<IProduct, 'id'>) => {
    let product: IProduct

    const productArgs: IProduct = {
        ...args,
        id: '',
        storeId: storeId
    }

    try {
        product = await ProductModel(connection).create(productArgs)

        if (product != null) {
            return product.transform()
        }

    } catch (error) {
        console.error("> createProduct error: ", error)
        throw new ApolloError("Error saving Product")
    }
}

export const deleteProduct = async (connection: mongoose.Connection, id: string, storeId: string) => {
    let product: IProduct | null

    try {
        product = await ProductModel(connection).findOneAndDelete({ _id: id, storeId: storeId })

        if (product != null) {
            return product.transform()
        }

    } catch (error) {
        console.error("> deleteProduct error: ", error)
        throw new ApolloError("Error deleting Product with id: " + id)
    }
}