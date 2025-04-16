import express from 'express';
import { addScoreLeaderboard, getLeaderboard } from '../controllers/leaderboardController.js';

const router = express.Router();

// Route to get the leaderboard
router.get('/', getLeaderboard);
router.post('/',addScoreLeaderboard);

export default router;