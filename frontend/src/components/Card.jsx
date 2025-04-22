import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";

function Card() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const APIURL = import.meta.env.VITE_API_URL;
  const [caughtPokemons, setCaughtPokemons] = useState([localStorage.getItem("caughtPokemons") || []]);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const res = await axios.get(`${APIURL}pokemons/`);
        setPokemons(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching pokemon data:", error);
        setLoading(false);
      }
    };
    fetchPokemons();
  }, [APIURL]);

 const handleCatch = (pokemon) => {
    if(!caughtPokemons) {
      // If caughtPokemons is null or empty, initialize it with the current pokemon
      localStorage.setItem("caughtPokemons", JSON.stringify([pokemon]));
      setCaughtPokemons([pokemon]);
      return;
		}

		// Check if the Pokémon is already caught
		const isCaught = caughtPokemons.some(
			(caughtPokemon) => caughtPokemon.name === pokemon.name
		);

		let updatedCaughtPokemons;

		if (isCaught) {
			// If the Pokémon is already caught, remove it (release it)
			updatedCaughtPokemons = caughtPokemons.filter(
				(caughtPokemon) => caughtPokemon.name !== pokemon.name
			);
		} else {
			// If the Pokémon is not caught, add it to the list
			if (caughtPokemons.length === 10) {
				alert("10 Pokémon caught! You can now battle!");
				return;
			}
			updatedCaughtPokemons = [...caughtPokemons, pokemon];
		}

		// Update localStorage
		localStorage.setItem(
			"caughtPokemons",
			JSON.stringify(updatedCaughtPokemons)
		);

		// Update state
		setCaughtPokemons(updatedCaughtPokemons);
 };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 bg-gray-200">
      {pokemons.map((pokemon) => (
        <div
          key={pokemon.name}
          className="text-center flex flex-col items-center bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all ease-in-out duration-300 p-5 mt-10"
        >
          <div className="flex justify-between place-items-center w-full mb-4 ">
            <div>
              <img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
                alt="Pokémon Ball"
                onClick={() => handleCatch(pokemon)}
                className={`w-12 h-12 cursor-pointer rounded-full transition-all ease-in-out duration-300 ${
                  caughtPokemons.includes(pokemon.name)
                    ? "bg-red-500"
                    : "bg-gray-200"
                }`}
              />

              {caughtPokemons.includes(pokemon.name) && (
                <p className="mt-2 text-lg font-semibold text-red-500">
                  Pokémon Caught!
                </p>
              )}
            </div>
            <Link
              to={`/pokemon/${pokemon.name}`}
              className="hover:text-green-600 transition-colors duration-300"
            >
              <FaArrowRight
                size={30}
                color="red"
                className="hover:text-green-600 transition-colors duration-300"
              />
            </Link>
          </div>

          <div className="flex flex-col items-center justify-between gap-10 mt-5">
            <img
              src={pokemon.profile}
              alt={pokemon.name}
              className="w-full h-[300px] object-cover rounded-lg shadow-md"
            />
            <div className="grid grid-cols-1 items-center">
              <h3 className="capitalize text-lg font-semibold text-gray-800">
                {pokemon.name}
              </h3>
              <p
                className={`
                  capitalize text-md font-medium text-white px-10 py-2 rounded-full
                  ${
                    pokemon.type === "fire"
                      ? "bg-orange-500 text-white"
                      : pokemon.type === "water"
                      ? "bg-blue-500 text-white"
                      : pokemon.type === "grass"
                      ? "bg-green-500 text-white"
                      : pokemon.type === "electric"
                      ? "bg-yellow-500 text-black"
                      : pokemon.type === "bug"
                      ? "bg-lime-500 text-white"
                      : pokemon.type === "poison"
                      ? "bg-purple-500 text-white"
                      : pokemon.type === "flying"
                      ? "bg-indigo-500 text-white"
                      : pokemon.type === "normal"
                      ? "bg-gray-300 text-black"
                      : "bg-gray-400 text-black"
                  }
                `}
              >
                {pokemon.type}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Card;
