import mongoose from 'mongoose'
import ClientModel, { IClient } from '../models/ClientModel'
import { ApolloError } from 'apollo-server'

export const getAllClients = async (connection: mongoose.Connection) => {
    let clients: IClient[]

    try {
        clients = await ClientModel(connection)
            .find()

        if (clients != null && clients.length > 0) {
            return clients.map(client => {
                return client.transform()
            })
        }
    } catch (error) {
        console.error("> getAllClients error: ", error)
        throw new ApolloError("Error retrieving all Clients")
    }
}

export const getClient = async (connection: mongoose.Connection, id: string) => {
    let client: IClient | null

    try {
        client = await ClientModel(connection)
            .findById(id)

        if (client != null) {
            return client.transform()
        }

    } catch (error) {
        console.error("> getClient error: ", error)
        throw new ApolloError("Error retrieving Client with id: " + id)
    }
}

export const createClient = async (connection: mongoose.Connection, args: Omit<IClient, 'id'>) => {
    let client: IClient | null | undefined

    const clientArgs: IClient = {
        ...args,
        id: '',
    }

    try {
        client = await ClientModel(connection).create(clientArgs)

        if (client != null) {
            return client.transform()
        }
            
    } catch (error) {
        console.error("> createClient error: ", error) 
        throw new ApolloError("Error saving Client") 
    }

    throw new ApolloError("Error saving Client")
}

export const deleteClient = async (connection: mongoose.Connection, id: String) => {
    let client: IClient | null | undefined

    try {
        client = await ClientModel(connection).findByIdAndDelete(id)

        if (client != null) {
            return client.transform()
        }
            
    } catch (error) {
        console.error("> deleteClient error: ", error) 
        throw new ApolloError("Error deleting Client with id: " + id) 
    }
}