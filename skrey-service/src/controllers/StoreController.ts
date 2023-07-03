import mongoose from 'mongoose'
import StoreModel, { IStore } from '../models/StoreModel'
import { ApolloError } from 'apollo-server'

export const getAllStores = async (connection: mongoose.Connection, userId: string) => {
    let stores: IStore[]

    try {
        stores = await StoreModel(connection)
            .find({ userId })

        if (stores != null && stores.length > 0) {
            return stores.map(store => {
                return store.transform()
            })
        }

    } catch (error) {
        console.error("> getAllStores error: ", error) 
        throw new ApolloError("Error retrieving all Stores") 
    }
}

export const getStore = async (connection: mongoose.Connection, id: string, userId: string) => {
    let store: IStore | null

    try {
        store = await StoreModel(connection)
            .findOne({ _id: id, userId: userId }) 

        if (store != null) {
            return store.transform()
        }

    } catch (error) {
        console.error("> getStore error: ", error) 
        throw new ApolloError("Error retrieving Store with id: " + id) 
    }
}

export const createStore = async (connection: mongoose.Connection, userId: string, args: Omit<IStore, 'id'>) => {
    let store: IStore

    const storeArgs: IStore = {
        ...args,
        id: '',
        userId: userId
    }

    try {
        store = await StoreModel(connection).create(storeArgs) 
        
        if (store != null) {
            return store.transform()
        }

    } catch (error) {
        console.error("> createStore error: ", error) 
        throw new ApolloError("Error saving Feedback") 
    }
}

export const updateStore = async (connection: mongoose.Connection, id: string, userId: string, args: any) => {
    let store: IStore | null

    try {
        store = await StoreModel(connection).findOneAndUpdate(
            { _id: id, userId: userId },
            args,
            { new: true }
        )

        if (store != null) {
            return store.transform()
        }

    } catch (error) {
        console.error("> updateStore error: ", error) 
        throw new ApolloError("Error updating Store with id: " + id) 
    }
}

export const deleteStore = async (connection: mongoose.Connection, id: string, userId: string) => {
    let store: IStore | null

    try {
        store = await StoreModel(connection).findOneAndDelete({ _id: id, userId: userId })

        if (store != null) {
            return store.transform()
        }

    } catch (error) {
        console.error("> deleteStore error: ", error) 
        throw new ApolloError("Error deleting Store with id: " + id) 
    }
}
