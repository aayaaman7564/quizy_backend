import mongoose from "mongoose";

const questionModel = new mongoose.Schema({
    questions: String,
    options: [String],
    answer: Number,
    level: String,
});

export const Questions = mongoose.model('questions', questionModel);