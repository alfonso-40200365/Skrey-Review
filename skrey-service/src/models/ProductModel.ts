import mongoose from "mongoose"

export interface IProduct extends mongoose.Document{
    id: string
    storeId?: string
    name: string
    link: string
    transform: () => IProduct
}

const schema: mongoose.SchemaDefinition = {
    storeId: { type: mongoose.SchemaTypes.String, required: false, unique: false },
    name: { type: mongoose.SchemaTypes.String, required: true, unique: false },
    link: { type: mongoose.SchemaTypes.String, required: true, unique: false },
}

const collectionName: string = "products"
const productSchema: mongoose.Schema = new mongoose.Schema(schema)

productSchema.methods.transform = function () {
    var obj = this.toObject()

    var id = obj._id
    delete obj._id
    obj.id = id

    return obj
}

const ProductModel = (connection: mongoose.Connection): mongoose.Model<IProduct> => 
    connection.model<IProduct>(collectionName, productSchema)

export default ProductModel