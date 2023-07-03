import mongoose from "mongoose" 

export interface IStore extends mongoose.Document {
    id: string
    userId: string
    name: string
    link: string
    transform: () => IStore
}

const schema: mongoose.SchemaDefinition = {
    userId: { type: mongoose.SchemaTypes.String, required: true, unique: false },
    name: { type: mongoose.SchemaTypes.String, required: true, unique: false },
    link: { type: mongoose.SchemaTypes.String, required: true, unique: false },
}

const collectionName: string = "store"
const storeSchema: mongoose.Schema = new mongoose.Schema(schema)

storeSchema.methods.transform = function () {
    var obj = this.toObject()

    var id = obj._id
    delete obj._id
    obj.id = id

    return obj
}

const StoreModel = (connection: mongoose.Connection): mongoose.Model<IStore> =>
    connection.model<IStore>(collectionName, storeSchema) 

export default StoreModel