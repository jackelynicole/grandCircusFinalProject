import { MongoClient } from "mongodb";
import dotenv from 'dotenv'

dotenv.config()

const uri = process.env.MONGODB_URI
const client = new MongoClient(uri)

export const connectToDatabase = async () => {
    try {
        if (!client.isConnected) await client.connect()
            console.log('MongoDB connected')
        return client.db()
    } catch (err) {
        console.error('MongoDB connection Error:', err)
        throw err
    }
}