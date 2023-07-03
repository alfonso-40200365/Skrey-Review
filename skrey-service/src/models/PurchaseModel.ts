import mongoose from 'mongoose'

export interface IPurchase extends mongoose.Document {
    id: string
    clientId: IClient
    productId: IProductOrID[]
    storeId: string
    timeStamp: Date
    transform: () => IPurchase
}

export interface IProductOrID {
    id?: string
    newProduct?: IProduct
}

export interface IClient {
    id?: string
    name: string
    email: string
}

export interface IProduct {
    id?: string
    name?: string
    link?: string
}

const schema: mongoose.SchemaDefinition = {
    clientId: {
        id: { type: mongoose.SchemaTypes.String, required: false },
        newClient: {
            name: { type: mongoose.SchemaTypes.String, required: false },
            email: { type: mongoose.SchemaTypes.String, required: false },
        },
    },
    productId: [
        {
            id: { type: mongoose.SchemaTypes.String, required: false },
            newProduct: {
                name: { type: mongoose.SchemaTypes.String, required: false },
                link: { type: mongoose.SchemaTypes.String, required: false },
            },
        },
    ],
    storeId: { type: mongoose.SchemaTypes.String, required: true, unique: false },
    timeStamp: { type: mongoose.SchemaTypes.Date, required: true, unique: false },
}

const collectionName: string = 'purchase'
const PurchaseSchema: mongoose.Schema = new mongoose.Schema(schema)

PurchaseSchema.methods.transform = function () {
    const obj = this.toObject()

    const id = obj._id
    delete obj._id
    obj.id = id

    return obj
}

const PurchaseModel = (connection: mongoose.Connection): mongoose.Model<IPurchase> =>
    connection.model<IPurchase>(collectionName, PurchaseSchema)

export default PurchaseModel
