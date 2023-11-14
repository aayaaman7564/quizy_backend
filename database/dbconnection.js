import mongoose from "mongoose";

export default async function connect(){
    await mongoose.connect(process.env.DbconnURL)
    console.log("Database Connected")
}