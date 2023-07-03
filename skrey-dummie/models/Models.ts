export interface IFeedback {
    storeId: string,
    productId: string,
    clientId: string,
    rating: number,
    comment?: string[]
}

export interface IStore {
    name: string,
    link: string,
}

export interface IPurchase {
    clientId: string,
    productId: string[],
    storeId: string,
    timeStamp: Date
}

export interface IClient {
    name: string,
    email: string
}

export interface IProduct {
    name: string,
    link: string
}