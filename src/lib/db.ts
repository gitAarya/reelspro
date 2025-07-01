import { channel } from "diagnostics_channel";
import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL!;
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || "myDatabase";
if(!MONGODB_URL){
    throw new Error("please define mongoDB url is env file")
}

let cached = global.mongoose;
if(!cached){
    cached=global.mongoose={conn:null,promise:null}

}

export async function connToDB() {
    if(cached.conn){
         return cached.conn
    }

    if(!cached.promise){
        const opts = {
            
          dbName: MONGODB_DB_NAME,
          bufferCommands: true,
          MaxPoolSize: 10,
        };
        cached.promise = mongoose.connect(MONGODB_URL, opts).then( (mongoose)=> mongoose.connection)


    }

    try {
        cached.conn=await cached.promise
        
    } catch (error) {
        cached.promise=null
        throw new Error(" db promise error")
    }

    return cached.conn;
}