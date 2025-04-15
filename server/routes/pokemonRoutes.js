import express from "express";
import {
  getPokemons,
  getPokemonByName,
} from "../controllers/pokemonController.js";

const router = express.Router();

router.get("/pokemons", getPokemons);
router.get("/pokemons/:name", getPokemonByName);

export default router;
