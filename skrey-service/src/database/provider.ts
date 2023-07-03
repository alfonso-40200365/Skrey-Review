import mongoose from "mongoose" 
import dotenv from "dotenv" 

dotenv.config() 

const uri: string = process.env.DATABASE_URL as string 

export const getConnection = async (): Promise<mongoose.Connection> => {
    if (mongoose.connection.name == undefined) {
        try {
        await mongoose.connect(uri, {
            bufferCommands: false,
            autoIndex: true,
            autoCreate: true
        })
            //console.log('Connection to DB was successful')
        } catch (error) {
            console.log('Connection to DB failed')
        }
    }
    return mongoose.connection 
}

export const closeConnection = async (): Promise<mongoose.Connection> => {
    try {
        await mongoose.connection.close()
        //console.log('Disconnection to DB was successful')
    } catch (error) {
        console.log('Disconnection to DB failed')
    }
    return mongoose.connection
}