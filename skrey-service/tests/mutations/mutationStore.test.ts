import { closeConnection, getConnection } from '../../src/database/provider' 
import { createStore, updateStore, deleteStore } from '../../src/controllers/StoreController' 
import { IStore } from '../../src/models/StoreModel' 
import mongoose from 'mongoose' 

let connection: mongoose.Connection

let storeInput: IStore | null | undefined = null
let updateStoreInput: IStore | null | undefined = null
let deletedStoreInput: IStore | null | undefined = null

describe('Mutation Store', () => {
    describe('createStore', () => {
        it('Operation Create for the collection Store', async () => {

            const storeArgs: Partial<IStore> = {
                name: 'Leroy Merlin',
                link: 'https://www.leroymerlin.pt/'
            }

            storeInput = await createStore(connection, 'admin', storeArgs as Omit<IStore, 'id'>) 

            if (storeInput !== null && storeInput !== undefined) {
                expect(storeInput).toBeDefined() 
                expect(storeInput.id).toBeDefined() 
                expect(storeInput.userId).toEqual('admin') 
                expect(storeInput.name).toEqual('Leroy Merlin') 
                expect(storeInput.link).toEqual('https://www.leroymerlin.pt/') 
            }
        }) 
    }) 

    describe('updateFeedback', () => {
        it('Operation Update for the collection Store', async () => {
            const updateArgs = {
                name: 'Continente',
                link: 'https://www.continente.pt/'
            }
            if (storeInput !== null && storeInput !== undefined) {
                updateStoreInput = await updateStore(connection, storeInput.id, storeInput.userId, updateArgs) 
                
                if (updateStoreInput !== null && updateStoreInput !== undefined) {
                    expect(updateStoreInput).toBeDefined() 
                    expect(updateStoreInput.id).toEqual(storeInput.id) 
                    expect(updateStoreInput.name).not.toEqual(storeInput.name) 
                    expect(updateStoreInput.link).not.toEqual(storeInput.link) 
                }
            }
        }) 
    }) 

    describe('deleteFeedback', () => {
        it('Operation Delete for the collection Store', async () => {
            if (storeInput !== null && storeInput !== undefined) {
                deletedStoreInput = await deleteStore(connection, storeInput.id, storeInput.userId) 

                if (deletedStoreInput !== null && deletedStoreInput !== undefined) {
                    expect(deletedStoreInput).toBeDefined() 
                    expect(deletedStoreInput.id).toEqual(deletedStoreInput.id) 
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