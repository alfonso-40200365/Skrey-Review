import { closeConnection, getConnection } from '../../src/database/provider'
import { getClient, getAllClients, createClient, deleteClient } from '../../src/controllers/ClientController';
import { IClient } from '../../src/models/ClientModel'
import mongoose from 'mongoose'

let connection: mongoose.Connection

let client: IClient | null | undefined = null
let clients: IClient[] | null | undefined = null
let fetchedClient: IClient | null | undefined = null

describe('Query Client', () => {
    describe('getClient', () => {
        it('Operation Get Client by ID', async () => {
            if (client !== null && client !== undefined) {
                fetchedClient = await getClient(connection, client.id!)

                if (fetchedClient !== null && fetchedClient !== undefined) {
                    expect(fetchedClient).toBeDefined()
                    expect(fetchedClient.id).toEqual(client.id)
                }
            }
        })
    })

    describe('getAllClients', () => {
        it('Operation Get All Clients from collection', async () => {
            clients = await getAllClients(connection)

            if (clients !== null && clients !== undefined) {
                expect(clients).toBeDefined()
                expect(Array.isArray(clients)).toBe(true)
            }
        })
    })
})

beforeAll(async () => {
    connection = await getConnection()

    const clientArgs: Partial<IClient> = {
        name: 'Alfonso Villanueva',
        email: 'alfonsovillanueva.00@gmail.com'
    }

    client = await createClient(connection, clientArgs as Omit<IClient, 'id'>)
})

afterAll(async () => {
    if (client !== null && client !== undefined) {
        await deleteClient(connection, client.id!)
    }

    connection = await closeConnection()
}) 