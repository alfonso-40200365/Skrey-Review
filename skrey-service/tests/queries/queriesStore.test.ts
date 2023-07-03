import { closeConnection, getConnection } from '../../src/database/provider' 
import { getStore, getAllStores, createStore, deleteStore } from '../../src/controllers/StoreController' 
import { IStore } from '../../src/models/StoreModel' 
import mongoose from 'mongoose' 

let connection: mongoose.Connection

let store: IStore | null | undefined = null 
let stores: IStore[] | null | undefined = null 
let fetchedStore: IStore | null | undefined = null 


describe('Query Store', () => {
    describe('getStore', () => {
        it('Operation Get Store by ID and User ID', async () => {
            if (store !== null && store !== undefined) {
                fetchedStore = await getStore(connection, store.id, store.userId) 

                if (fetchedStore !== null && fetchedStore !== undefined) {
                    expect(fetchedStore).toBeDefined() 
                    expect(fetchedStore.id).toEqual(store.id) 
                }
            }
        })
    })

    describe('getAllStores', () => {
        it('Operation Get All Stores from collection with User ID', async () => {
            if (store !== null && store !== undefined) {
                stores = await getAllStores(connection, store.userId) 

                if (stores !== null && stores !== undefined) {
                    expect(stores).toBeDefined() 
                    expect(Array.isArray(stores)).toBe(true) 
                }
            }
        })
    })
})

beforeAll(async () => {
    connection = await getConnection() 

    const storeArgs: Partial<IStore> = {
        name: 'Leroy Merlin',
        link: 'https://www.leroymerlin.pt/'
    }
    store = await createStore(connection, 'admin', storeArgs as Omit<IStore, 'id'>) 
}) 
  
afterAll(async () => {
    if (store !== null && store !== undefined) {
        await deleteStore(connection, store.id, store.userId) 
    }
    
    connection = await closeConnection() 
}) 