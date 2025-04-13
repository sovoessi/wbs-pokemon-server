import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaRuler } from "react-icons/fa";
import { GiWeight } from "react-icons/gi";
const typeColors = {
  water: "#7EC8E3",
  fire: "#F08030",
  grass: "#78C850",
  electric: "#F8D030",
  psychic: "#F85888",
  ice: "#98D8D8",
  dragon: "#7038F8",
  dark: "#705848",
  fairy: "#EE99AC",
  normal: "#A8A878",
  fighting: "#C03028",
  flying: "#A890F0",
  poison: "#A040A0",
  ground: "#E0C068",
  rock: "#B8A038",
  bug: "#A8B820",
  ghost: "#705898",
  steel: "#B8B8D0",
};

const PokemonDetail = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const APIURL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        const res = await axios.get(`${APIURL}pokemons/${name}`);
        setPokemon(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching pokemon data:", error);
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [name, APIURL]);

  useEffect(() => {
    if (pokemon?.type) {
      const bgColor = typeColors[pokemon.type.toLowerCase()] || "#ffffff";
      document.body.style.backgroundColor = bgColor;

      return () => {
        document.body.style.backgroundColor = "#ffffff";
      };
    }
  }, [pokemon]);

  if (loading) return <p>Loading...</p>;
  if (!pokemon) return <p>Pokémon not found!</p>;

  if (loading) return <p>Loading...</p>;

  if (!pokemon) return <p>Pokémon not found!</p>;

  return (
    <div className="text-center mt-10 flex items-center justify-around gap-10">
      <div className="left">
        <h1 className="text-3xl font-bold capitalize">Name: {pokemon.name}</h1>

        <div className="flex flex-col flex-wrap mt-10">
          <h3 className="font-bold text-2xl mb-2 text-left"> Abilites</h3>
          <div className="flex gap-2 flex-wrap">
            {Array.isArray(pokemon.abilities) &&
              pokemon.abilities.map((ability, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-full text-blue-500 bg-white font-semibold"
                >
                  {ability}
                </span>
              ))}
          </div>
        </div>

        <div>
          <h3 className="font-bold text-2xl mb-2 text-left mt-10"> Types </h3>
          <p className=" text-xl capitalize px-4 py-2 rounded-full text-white bg-black  font-semibold">
            {pokemon.type}
          </p>
        </div>
        <div className="flex gap-10 mt-10 ">
          <div className="flex flex-col items-center rounded bg-white text-black p-4 shadow-md">
            <div className="text-center">
              <FaRuler className="text-lg mr-2 inline-block" />
              <span>Height</span>
            </div>
            <p className="ml-6">{pokemon.height * 100} cm</p>
          </div>
          <div className="flex flex-col items-center rounded bg-white text-black p-4 shadow-md">
            <div className="text-center flex   place-items-center justify-between">
              <GiWeight className="text-lg mr-2 inline-block" />
              <span>Weight</span>
            </div>
            <p className="ml-3">{pokemon.weight} kg</p>
          </div>
        </div>
      </div>
      <div className="right">
        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="w-full h-80 object-cover mt-5 rounded-lg shadow-md"
        />
      </div>
    </div>
  );
};

export default PokemonDetail;
