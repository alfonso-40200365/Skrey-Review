import mongoose from "mongoose" 

export interface IFeedback extends mongoose.Document{
  id: string
  storeId: string
  productId: string
  clientId: string
  rating: number
  comment: string
  verified: boolean
  timeStamp: Date
  transform: () => IFeedback
}

const schema: mongoose.SchemaDefinition = {
    storeId: { type: mongoose.SchemaTypes.String, required: true, unique: false },
    productId: { type: mongoose.SchemaTypes.String, required: true, unique: false },
    clientId: { type: mongoose.SchemaTypes.String, required: true, unique: false },
    rating: { type: mongoose.SchemaTypes.Number , required: true, unique: false },
    comment: { type: mongoose.SchemaTypes.String, required: false, unique: false },
    verified: { type: mongoose.SchemaTypes.Boolean, required: true, unique: false },
    timeStamp: { type: mongoose.SchemaTypes.Date, required: true, unique: false },
}

const collectionName: string = "feedback"
const feedbackSchema: mongoose.Schema = new mongoose.Schema(schema)

feedbackSchema.methods.transform = function () {
    var obj = this.toObject()

    var id = obj._id
    delete obj._id
    obj.id = id

    return obj
}

const FeedbackModel = (connection: mongoose.Connection): mongoose.Model<IFeedback> => 
  connection.model<IFeedback>(collectionName, feedbackSchema) 


export default FeedbackModel