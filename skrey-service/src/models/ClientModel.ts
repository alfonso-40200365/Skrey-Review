import mongoose from "mongoose"

export interface IClient extends mongoose.Document{
    id?: string
    name: string
    email: string
    transform: () => IClient
}
  
const schema: mongoose.SchemaDefinition = {
    name: { type: mongoose.SchemaTypes.String, required: true, unique: false },
    email: { type: mongoose.SchemaTypes.String, required: true, unique: false },
}

const collectionName: string = "client"
const clientSchema: mongoose.Schema = new mongoose.Schema(schema)

clientSchema.methods.transform = function () {
    var obj = this.toObject()

    var id = obj._id
    delete obj._id
    obj.id = id

    return obj
}

const ClientModel = (connection: mongoose.Connection): mongoose.Model<IClient> => 
    connection.model<IClient>(collectionName, clientSchema)

export default ClientModel