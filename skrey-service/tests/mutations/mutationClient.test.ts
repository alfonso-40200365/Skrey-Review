import { closeConnection, getConnection } from '../../src/database/provider' 
import { createClient, deleteClient } from '../../src/controllers/ClientController';
import { IClient } from '../../src/models/ClientModel' 
import mongoose from 'mongoose' 

let connection: mongoose.Connection

let clientInput: IClient | null | undefined = null
let deletedClientInput: IClient | null | undefined = null

describe('Mutation Client', () => {
    describe('createClient', () => {
        it('Operation Create for the collection Client', async () => {
            
            const clientArgs: Partial<IClient> = {
                name: 'Alfonso Villanueva',
                email: 'alfonsovillanueva.00@gmail.com'
            }

            clientInput = await createClient(connection, clientArgs as Omit<IClient, 'id'>)

            if (clientInput !== null && clientInput !== undefined) {
                expect(clientInput).toBeDefined()
                expect(clientInput.id).toBeDefined()
                expect(clientInput.name).toEqual('Alfonso Villanueva')
                expect(clientInput.email).toEqual('alfonsovillanueva.00@gmail.com')
            }
        })
    })

    describe('deleteClient', () => {
        it('Operation Delete for the collection Client', async () => {
            if (clientInput !== null && clientInput !== undefined) {
                deletedClientInput = await deleteClient(connection, clientInput.id!)

                if (deletedClientInput !== null && deletedClientInput !== undefined) {
                    expect(deletedClientInput).toBeDefined()
                    expect(deletedClientInput.id).toEqual(clientInput.id)
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