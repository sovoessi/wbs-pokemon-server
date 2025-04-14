import Leaderboard from "../models/Leaderboard";
import User from "../models/User";


export const getLeaderboard = async (req, res) => {
    try {
        const leaderboard = await Leaderboard.find()
            .populate("userId", "username")
            .sort({ score: -1 })
            .limit(10);
        res.status(200).json(leaderboard);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const addScoreLeaderboard = async (req, res) => {
    try {
        const { userId, score } = req.body;

        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the score already exists for the user
        const existingScore = await Leaderboard.findOne({ userId });
        if (existingScore) {
            // Update the score if it already exists
            existingScore.score = score;
            await existingScore.save();
        } else {
            // Create a new score entry if it doesn't exist
            const newScore = new Leaderboard({
                userId,
                score,
            });
            await newScore.save();
        }

        res.status(200).json({ message: "Score updated successfully" });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
