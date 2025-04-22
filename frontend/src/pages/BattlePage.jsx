import { useEffect, useState } from "react";
import { getRandomPokemons, userWins } from "../utils/gameplay";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BattlePage = () => {
	const [userPokemons, setUserPokemons] = useState([]);
	const [opponentPokemons, setOpponentPokemons] = useState([]);
	const [userScore, setUserScore] = useState(0);
	const [opponentScore, setOpponentScore] = useState(0);

	const navigate = useNavigate();

	// Fetch user's caught Pokémon from localStorage
	const fetchUserPokemons = () => {
		const caughtPokemons = JSON.parse(
			localStorage.getItem("caughtPokemons") || "[]"
		);
		if (caughtPokemons.length > 0) {
			setUserPokemons(caughtPokemons);
		} else {
			alert("No caught Pokémon found. Please catch some Pokémon first.");
			navigate("/card"); // Redirect to the card page if no Pokémon are caught
		}
	};

	// Fetch random opponent Pokémon
	const fetchOpponentPokemons = async () => {
		const pokemons = await getRandomPokemons();
		setOpponentPokemons(pokemons);
	};

	// Initialize user and opponent Pokémon on component mount
	useEffect(() => {
		fetchUserPokemons();
		fetchOpponentPokemons();
	}, []);

	// Handle the battle logic
	const fightMode = () => {
		if (userPokemons.length === 0 || opponentPokemons.length === 0) {
			alert("Both players need Pokémon to battle!");
			return;
		}

		userPokemons.forEach((userPokemon, index) => {
			const opponentPokemon = opponentPokemons[index];
			if (opponentPokemon) {
				if (userWins(userPokemon, opponentPokemon)) {
					setUserScore((prevScore) => prevScore + 1);
				} else {
					setOpponentScore((prevScore) => prevScore + 1);
				}
			}
		});

		// Reset Pokémon for the next battle
		fetchOpponentPokemons();
	};

	// Save the user's score to the leaderboard
	const saveScore = async () => {
		const token = localStorage.getItem("token");
		if (!token) {
			alert("You must be logged in to save your score.");
			navigate("/login");
			return;
		}

		try {
			const userId = JSON.parse(atob(token.split(".")[1])).id; // Decode user ID from token
			await axios.post(`${import.meta.env.VITE_API_URL}api/leaderboard`, {
				userId,
				score: userScore,
			});
			alert("Score saved successfully!");
			navigate("/");
		} catch (error) {
			console.error("Error saving score:", error);
			alert("Failed to save score. Please try again.");
		}

		// Reset scores and fetch new Pokémon
		setUserScore(0);
		setOpponentScore(0);
		fetchUserPokemons();
		fetchOpponentPokemons();
	};

	return (
		<>
			<h1 className='text-3xl font-bold underline text-center mb-6'>Battle</h1>
			<div className='grid grid-cols-3 gap-4 m-4'>
				{/* User Pokémons */}
				<div className='bg-white p-4 rounded-lg shadow-md'>
					<h2 className='text-xl font-bold mb-4 text-center'>My Pokémon</h2>
					{userPokemons.map((pokemon, index) => (
						<div
							key={index}
							className='mb-6'
						>
							<p className='font-semibold'>{pokemon.name}</p>
							<p>Type: {pokemon.type}</p>
							<p>Power: {pokemon.power}</p>
							<img
								src={pokemon.image}
								alt={pokemon.name}
								className='w-full h-40 object-cover mt-3 rounded-lg shadow-md'
							/>
						</div>
					))}
				</div>

				{/* Battle Actions */}
				<div className='bg-gray-100 p-4 rounded-lg shadow-md flex flex-col items-center justify-center'>
					<h2 className='text-xl font-bold mb-4 text-center'>Battle Actions</h2>
					{userScore || opponentScore ? (
						<div className='mb-4'>
							<h2 className='text-lg font-bold text-green-600'>
								User Score: {userScore}
							</h2>
							<h2 className='text-lg font-bold text-red-600'>
								Opponent Score: {opponentScore}
							</h2>
						</div>
					) : null}
					<button
						onClick={fightMode}
						className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4'
					>
						Fight
					</button>
					{userScore > 0 && (
						<button
							onClick={saveScore}
							className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
						>
							Save Score
						</button>
					)}
				</div>

				{/* Opponent Pokémons */}
				<div className='bg-white p-4 rounded-lg shadow-md'>
					<h2 className='text-xl font-bold mb-4 text-center'>
						Opponent Pokémon
					</h2>
					{opponentPokemons.map((pokemon, index) => (
						<div
							key={index}
							className='mb-6'
						>
							<p className='font-semibold'>{pokemon.name}</p>
							<p>Type: {pokemon.type}</p>
							<p>Power: {pokemon.power}</p>
							<img
								src={pokemon.image}
								alt={pokemon.name}
								className='w-full h-40 object-cover mt-3 rounded-lg shadow-md'
							/>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default BattlePage;
