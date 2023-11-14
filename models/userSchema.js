import mongoose from "mongoose";

const userModel = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

export const Users = mongoose.model('Users', userModel);