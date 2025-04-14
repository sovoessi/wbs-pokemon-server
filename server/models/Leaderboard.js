import mongoose from "mongoose";

const leaderboardSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    score: {
        type: Number,
        required: true,
    },
        date: {
            type: Date,
            default: Date.now,
        },
    }, {
        timestamps: true,
    }
);

const Leaderboard = mongoose.model("Leaderboard", leaderboardSchema);
export default Leaderboard;