import pokemons from "../data/pokemons.js";
const getPokemons = (req, res) => {
  res.json(pokemons);
};

const getPokemonByName = (req, res) => {
  const { name } = req.params;
  const pokemon = pokemons.find(
    (pokemon) => pokemon.name.toLowerCase() === name.toLowerCase()
  );

  if (!pokemon) {
    return res.status(404).json({ message: "Pokémon not found" });
  }

  res.json(pokemon);
};

export { getPokemons, getPokemonByName };
