export interface IFeedback {
    id: string
    storeId: string
    productId: string
    rating: number
    comment: string[]
    timeStamp: Date
    verified: boolean
}

export interface IStore {
    id: string
    link: string
    name: string
    userId: string
}

export interface IProduct {
    id: string
    storeId: string
    name: string
    link: string
}

export interface IClient {
    id: string
    name: string
    email: string
}

export interface IPurchase {
    id: string
    clientId: IClient
    productId: IProductOrID[]
    storeId: string
    timeStamp: Date
}

export interface IProductOrID {
    id?: string
    newProduct?: IProduct
}

export type UpdateFeedbackInput = {
    verified: boolean
}

export type CreateStoreInput = {
    name: string,
    link: string
}

