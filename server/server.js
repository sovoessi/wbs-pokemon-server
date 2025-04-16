import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import pokemonRoutes from "./routes/pokemonRoutes.js";
import leaderboardRoutes from "./routes/leaderboardRoutes.js";
import authRoutes from './routes/authRoutes.js';

const PORT = process.env.PORT || 3000;

connectDB();

const app = express();
dotenv.config();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", pokemonRoutes);
app.use('/api/leaderboard', leaderboardRoutes)
app.use('/api/auth', authRoutes);


app.get("/", (req, res) => {
  res.send("Welcome to the poke-battle api");
});

app.listen(PORT, () => {
  console.log(`Server 🏃 on port ${PORT}`);
});
