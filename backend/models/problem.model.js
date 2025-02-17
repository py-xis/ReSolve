import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    platform: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    difficulty: {
        type: mongoose.Schema.Types.Mixed,  // Allow string, number, or arrays
        default: "Unknown"
    },
    tags: {
        type: [String],  // Ensures tags are always an array of strings
        default: []
    },
});

const Problem = mongoose.model("Problem", problemSchema);
export default Problem;