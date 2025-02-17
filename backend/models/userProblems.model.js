import mongoose from "mongoose";

const userProblemsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    problems: {
        type: Map,
        of: Boolean,  // ✅ Key = problemId, Value = Boolean (revisited or not)
        default: {}   // ✅ Default to an empty dictionary
    }
}, { timestamps: true });

const UserProblems = mongoose.model("UserProblems", userProblemsSchema);
export default UserProblems;